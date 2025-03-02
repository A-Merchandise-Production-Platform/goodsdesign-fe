import AddressUpdate from '@/app/(root)/profile/_component/add-address-button';
import UpdateProfileForm from '@/app/(root)/profile/_component/update-profile-form';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <div>
      <div>
        <h2 className="mb-2 text-xl font-semibold">Profile</h2>
        <p className="text-muted-foreground mb-10">
          This is how others will see you on the site.
        </p>
      </div>

      <UpdateProfileForm />
      <Separator className="my-8" />
      <div className="gap-4q flex items-start">
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-semibold">Addresses</h2>
          <p className="text-muted-foreground">
            Your saved addresses for faster checkout.
          </p>
        </div>
        <AddressUpdate />
      </div>
    </div>
  );
}
