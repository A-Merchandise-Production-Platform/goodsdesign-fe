import Link from 'next/link';

import LoginForm from '@/app/(auth)/login/components/login-form';
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
      <Card className="bg-background mx-auto max-w-lg border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Login to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="text-sm">
          <span className="text-muted-foreground mr-2 text-sm">
            Dont have an account?{' '}
          </span>
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
