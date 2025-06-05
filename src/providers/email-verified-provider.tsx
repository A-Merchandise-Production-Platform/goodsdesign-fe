'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MailIcon, RefreshCwIcon } from 'lucide-react';
import {
  useGetExpiredTimeQuery,
  useGetMeLazyQuery,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '@/graphql/generated/graphql';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function EmailVerifiedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuth } = useAuthStore();
  const [open, setOpen] = useState(!!user && !user.isVerified);
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { setUser, logout } = useAuthStore();

  //APIs
  const {
    data: expiredTimeData,
    loading: expiredTimeLoading,
    refetch: refetchExpiredTime,
  } = useGetExpiredTimeQuery({
    variables: {
      email: user?.email || '',
    },
    skip: !user?.email,
    fetchPolicy: 'no-cache',
  });

  const [getMe, { loading: getMeLoading }] = useGetMeLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setUser(data?.getMe);
    },
  });

  const [verifyOtp, { loading: verifyOtpLoading }] = useVerifyOtpMutation({
    variables: {
      verifyOtpInput: {
        email: user?.email || '',
        code: verificationCode.join(''),
      },
    },
    onCompleted: async () => {
      setVerificationCode(['', '', '', '', '', '']);
      toast.success('Email verified successfully');
      setOpen(false);
      await getMe();
      router.push('/');
    },
    onError: error => {
      toast.error(error.message);
    },
    fetchPolicy: 'no-cache',
    refetchQueries: ['GetMe'],
  });

  const [resendOtp, { loading: resendOtpLoading }] = useResendOtpMutation({
    variables: {
      email: user?.email || '',
    },
    onCompleted: async () => {
      toast.success('Verification code sent successfully');
      // Refetch the expiration time after successful resend
      await refetchExpiredTime();
    },
    fetchPolicy: 'no-cache',
  });

  // Handle countdown timer based on expiration time
  useEffect(() => {
    if (!expiredTimeData?.getExpiredTime) return;

    const calculateTimeRemaining = () => {
      const expirationTime = new Date(expiredTimeData.getExpiredTime).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, Math.floor((expirationTime - now) / 1000));
      return difference;
    };

    const initialRemaining = calculateTimeRemaining();
    setTimeRemaining(initialRemaining);

    if (initialRemaining <= 0) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredTimeData?.getExpiredTime]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setVerificationCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');

    if (code.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    await verifyOtp({
      variables: {
        verifyOtpInput: {
          email: user?.email || '',
          code,
        },
      },
    });
  };

  const handleResendCode = async () => {
    if (timeRemaining > 0) return;

    const response = await resendOtp();
    if (response.data?.resendOTP) {
      // Reset verification code
      setVerificationCode(['', '', '', '', '', '']);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {children}
      <Dialog open={open}>
        <DialogContent
          showClose={false}
          className="border-none bg-transparent shadow-none"
        >
          <DialogTitle className="hidden">Verify Your Email</DialogTitle>
          <div className="flex items-center justify-center">
            <Card className="w-full">
              <CardHeader className="space-y-1 text-center">
                <div className="mb-2 flex justify-center">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                    <MailIcon className="text-primary h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                <CardDescription>
                  We've sent a verification code to{' '}
                  <span className="text-primary font-bold">
                    {user?.email || 'your email'}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <p className="text-muted-foreground mb-4 text-sm">
                      Enter the 6-digit code to verify your email address
                    </p>

                    <div className="flex justify-between gap-2">
                      {verificationCode.map((digit, index) => (
                        <Input
                          key={index}
                          ref={el => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          className="h-12 w-12 text-center text-lg"
                          value={digit}
                          onChange={e =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={e => handleKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          autoFocus={index === 0}
                          disabled={verifyOtpLoading}
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      verifyOtpLoading || verificationCode.join('').length !== 6
                    }
                  >
                    {verifyOtpLoading ? 'Verifying...' : 'Verify Email'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="mb-4 text-center text-sm">
                  Didn't receive the code?
                </div>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={handleResendCode}
                  disabled={
                    timeRemaining > 0 || resendOtpLoading || verifyOtpLoading
                  }
                >
                  <RefreshCwIcon className="mr-2 h-4 w-4" />
                  {timeRemaining > 0
                    ? `Resend code (${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')})`
                    : resendOtpLoading
                      ? 'Sending...'
                      : 'Resend verification code'}
                </Button>

                <Button
                  variant="destructive"
                  type="button"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
