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
export default function Page() {
  return (
    <div className="pt-10">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Register to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="text-sm">
          <span className="mr-2 text-sm text-muted-foreground">
            Already have an account?{' '}
          </span>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
