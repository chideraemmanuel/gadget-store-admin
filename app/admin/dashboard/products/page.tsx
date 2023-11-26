import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

interface Props {}

const ProductsPage: FC<Props> = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col gap-3 items-center md:justify-between px-4 py-5">
        <div className="flex items-center md:justify-start justify-stretch md:w-auto w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 translate-y-[-50%] left-2 text-gray-500" />
            <Input className="pl-10" placeholder="Search products" />
          </div>

          <Select>
            <SelectTrigger className="flex-1">
              {/* <SelectTrigger className="w-[180px] flex-1"> */}
              <SelectValue placeholder="Filter Products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="allProducts">All Products</SelectItem>
              <SelectItem value="featuredProducts">
                Featured Products
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger>
            <Button className="w-full md:w-auto flex items-center gap-1">
              <Plus />
              <span>Add product</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <span>Products Page!</span>
    </>
  );
};

export default ProductsPage;
