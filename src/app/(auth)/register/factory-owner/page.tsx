import RegisterFactoryOwnerForm from '@/app/(auth)/register/factory-owner/_components/register-factory-owner-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export default function Page() {
  return (
    <div className="pt-10">
      <Card className="bg-background mx-auto max-w-5xl border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Register Factory Owner</CardTitle>
          <CardDescription>
            Register to access the system as a factory owner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterFactoryOwnerForm />
        </CardContent>
      </Card>
    </div>
  );
}
