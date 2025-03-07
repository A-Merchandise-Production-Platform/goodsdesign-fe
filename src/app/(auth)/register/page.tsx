import Link from 'next/link';

import RegisterForm from '@/app/(auth)/register/components/register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
export default function Page() {
  return (
    <div className="pt-10">
      <Card className="bg-background mx-auto max-w-lg border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Register to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex flex-col items-start text-sm">
          <Separator className="my-4" />
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2 text-sm">
              Already have an account?{' '}
            </span>
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
