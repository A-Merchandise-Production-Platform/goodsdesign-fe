import LoginForm from '@/app/(auth)/login/components/LoginForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
export default function Page() {
  return (
    <div className="pt-10">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Login to access the system</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="text-sm">
          <span className="mr-2 text-sm text-muted-foreground">
            Dont have an account?{' '}
          </span>
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
