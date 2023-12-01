'use client';

import { FC } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import useGetCategories from '@/lib/hooks/useGetCategories';
import SelectField from '@/components/selectField/SelectField';

interface Props {}

const dummy = [
  {
    title: 'John Doe',
    value: 'John Doe',
    // icon: <FiUser />,
  },
  {
    title: 'Jane Doe',
    value: 'Jane Doe',
    // icon: <FiUserPlus />,
  },
];

export interface FormData {
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  main_image: File;
  other_images: FileList;
  count_in_stock: number;
  featured: boolean;
}

const AddProductForm: FC<Props> = () => {
  const { data: categories, isError, isLoading } = useGetCategories();

  // const schema = z
  //   .object({
  //     category: z.string({ required_error: 'Category is required' }).optional(),
  //   })
  //   .passthrough();

  const form = useForm<FormData>({
    defaultValues: { featured: false },
    // resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <DevTool control={control} />
        <div className="flex gap-2">
          <div>
            <Label htmlFor="product_name">Product Name</Label>
            <Input
              placeholder="Enter product name"
              id="product_name"
              {...register('product_name', {
                required: 'Product Name is required',
              })}
              className={`${errors.product_name?.message && 'border-red-700'}`}
            />
            <span className="text-xs text-red-700">
              {errors.product_name?.message}
            </span>
          </div>

          <div>
            <Label htmlFor="brand">Product Brand</Label>
            <Input
              placeholder="Enter product brand"
              id="brand"
              {...register('brand', {
                required: 'Product Brand is required',
              })}
              className={`${errors.brand?.message && 'border-red-700'}`}
            />
            <span className="text-xs text-red-700">
              {errors.brand?.message}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Product Description</Label>
          <Textarea
            placeholder="Enter product description"
            id="description"
            {...register('description', {
              required: 'Product Description is required',
            })}
            className={`resize-none ${
              errors.description?.message && 'border-red-700'
            }`}
          />
          <span className="text-xs text-red-700">
            {errors.description?.message}
          </span>
        </div>

        <div className="flex gap-2">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              step={'any'}
              {...register('price', {
                valueAsNumber: true,
                required: 'Add product price',
                validate: (value) =>
                  value > 0 || 'Price cannot be less than $1',
              })}
              className={`${errors.price?.message && 'border-red-700'}`}
            />
            <span className="text-xs text-red-700">
              {errors.price?.message}
            </span>
          </div>

          {/* category */}
          <div className="flex-1">
            <Label htmlFor="category">Product Category</Label>
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Product Category</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      {/* <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <SelectField
            id="category"
            placeholder="Select a category"
            register={register}
            registerOptions={{ required: 'Select a category' }}
            fieldName="category"
            list={dummy}
            toggleStyles={
              errors.category?.message
                ? { border: '1px solid rgb(185 28 28)' }
                : undefined
            }
          /> */}

            {/* <span className="text-xs text-red-700">
            {errors.category?.message}
          </span> */}
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            <Label htmlFor="main_image">Main Image</Label>
            <Input
              type="file"
              id="main_image"
              {...register('main_image', {
                required: 'Main Image is required',
              })}
              className={`${errors.main_image?.message && 'border-red-700'}`}
            />
            <span className="text-xs text-red-700">
              {errors.main_image?.message}
            </span>
          </div>

          <div>
            <Label htmlFor="other_images">Other Images</Label>
            <Input
              type="file"
              multiple
              id="other_images"
              {...register('other_images')}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="count_in_stock">Count in Stock</Label>
          <Input
            type="number"
            id="count_in_stock"
            {...register('count_in_stock', {
              valueAsNumber: true,
              required: 'Add product price',
              validate: (value) =>
                value > 0 || 'Count in stock cannot be less than 1',
            })}
            className={`${errors.count_in_stock?.message && 'border-red-700'}`}
          />
          <span className="text-xs text-red-700">
            {errors.count_in_stock?.message}
          </span>
        </div>

        {/* <div className="flex flex-row items-center justify-start self-start gap-2 rounded-md border p-4">
          <Label htmlFor="featured">Featured Product</Label>
          <input
            type="checkbox"
            id="featured"
            {...register('featured')}
            className="cursor-pointer"
          />
        </div> */}

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start self-start space-x-3 space-y-0 rounded-md border p-4">
              {/* <div className="space-y-1 leading-none"> */}
              <FormLabel className="">Featured product</FormLabel>
              {/* </div> */}
              <FormControl className="">
                <Checkbox
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter className="sm:justify-start">
          <Button>Add Product</Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddProductForm;

// product_name: {
//   type: String,
//   required: true,
// },
// brand: {
//   type: String,
//   required: true,
// },
// description: {
//   type: String,
//   required: true,
// },
// price: {
//   type: Number,
//   required: true,
//   min: 1,
// },
// category: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Category',
//   required: true,
//   autopopulate: true,
// },
// main_image: {
//   type: String,
//   required: true,
// },
// other_images: {
//   type: [String],
//   default: [],
// },
// //   availability: {
// //     type: String,
// //     required: true,
// //   },
// count_in_stock: {
//   type: Number,
//   required: true,
//   min: 0,
// },
// featured: {
//   type: Boolean,
//   default: false,
// },
