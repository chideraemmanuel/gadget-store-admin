import { Separator } from '@/components/ui/separator';
import DashboardHeader from '@/containers/dashboard-header/DashboardHeader';
import Sidebar from '@/containers/sidebar/Sidebar';
import AdminAuthProvider from '@/decorators/AdminAuthProvider';
import { FC } from 'react';

const DashboardLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AdminAuthProvider>
        <DashboardHeader />

        <div>
          <Sidebar />

          <main className="ml-0 md:ml-[min(270px,_30vw)]">{children}</main>
        </div>
      </AdminAuthProvider>
    </>
  );
};

export default DashboardLayout;
