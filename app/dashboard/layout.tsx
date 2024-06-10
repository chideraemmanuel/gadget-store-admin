import DashboardHeader from '@/container/dashboard-header/DashboardHeader';
import Sidebar from '@/container/sidebar/Sidebar';
import AdminAuthProvider from '@/decorators/AdminAuthProvider';
import { FC } from 'react';

const DashboardLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // <div className="grid grid-cols-[3fr,_9fr] items-stretch h-full bg-blue-500">
    // <AdminAuthProvider>
    <div>
      <Sidebar />

      <div className="ml-0 md:ml-[min(270px,_30vw)]">
        <DashboardHeader />

        <div>{children}</div>
      </div>
    </div>
    // </AdminAuthProvider>
  );
};

export default DashboardLayout;
