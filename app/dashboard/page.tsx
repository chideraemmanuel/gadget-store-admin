'use client';

import ComboBoxInput from '@/components/ComboBoxInput';
import ImageInput from '@/components/ImageInput';
import { Overview } from '@/components/Overview';
import SelectInput from '@/components/SelectInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { headers } from '@/constants';
import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {}

const dum = [
  {
    id: '34698987345343',
    name: 'Brand Name One',
    value: '34698987345343',
  },
  {
    id: '02873200912892',
    name: 'Brand Name Two',
    value: '02873200912892',
  },
  {
    id: '09373929823782',
    name: 'Brand Name Three',
    value: '09373929823782',
  },
  // {
  //   id: 'Brand Four Id',
  //   name: 'Brand Name Four',
  //   value: 'Brand Value Four',
  // },
  // {
  //   id: 'Brand Five Id',
  //   name: 'Brand Name Five',
  //   value: 'Brand Value Five',
  // },
];

const AdminDashboard: FC<Props> = () => {
  const [cbOpen, setCbOpen] = useState(false);

  return (
    // <div className="">

    <div className="container mx-auto pb-7">
      {/* <ComboBoxInput
        comboboxItems={dum}
        comboboxOpen={cbOpen}
        setComboboxOpen={setCbOpen}
        onItemSelect={(value) => console.log('selected item value:', value)}
        defautlValue={{
          id: 'Brand One Id',
          name: 'Brand Name One',
          value: 'Brand Value One',
        }}
      /> */}

      {/* <ImageInput label="Product Image" error="Error Message" /> */}

      {/* <SelectInput
        selectInputItems={dum}
        onItemSelect={(value) => console.log('selected item value:', value)}
        placeholder="Select Brand"
        error="Error message"
        defautlValue="Brand One Id"
      /> */}

      <DashboardHeaderText />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 pb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
    </div>

    // </div>
  );
};

export default AdminDashboard;
