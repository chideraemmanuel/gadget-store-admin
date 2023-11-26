import { FC } from 'react';

interface Props {}

const AdminDashboard: FC<Props> = () => {
  return (
    <>
      <div className="block md:hidden">
        {/* to replace with value from state or pathname */}
        <h2 className="font-bold text-2xl">Overview</h2>
      </div>

      <span>Admin Dashboard</span>
    </>
  );
};

export default AdminDashboard;
