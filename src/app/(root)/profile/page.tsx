import UpdateProfileForm from '@/app/(root)/profile/_component/update-profile-form';

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
    </div>
  );
}
