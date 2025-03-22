import { Metadata } from 'next';

import ProfileLayout from '@/app/(root)/profile/_component/profile-layout';
import Footer from '@/components/shared/footer';
import AuthGuardProvider from '@/providers/auth-guard-provider';

export const metadata: Metadata = {
  title: 'Profile',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AuthGuardProvider>
        <ProfileLayout>{children}</ProfileLayout>
        <Footer />
      </AuthGuardProvider>
    </main>
  );
}
