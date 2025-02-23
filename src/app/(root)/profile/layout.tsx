import { Metadata } from 'next';

import { ProfileSidebar } from '@/app/(root)/profile/_component/profile-sidebar';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import AdminGuardProvider from '@/providers/admin-guard-provider';

export const metadata: Metadata = {
  title: 'Profile',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AdminGuardProvider>
        <Header />
        <section className="mx-auto mt-16">
          <div className="container mx-auto pt-8">
            <div className="container mx-auto py-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
                <ProfileSidebar />
                <div className="space-y-6">{children}</div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </AdminGuardProvider>
    </main>
  );
}
