'use client';

import { FC, FormEvent, useRef, useState } from 'react';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import useGetCategories from '@/lib/hooks/useGetCategories';
import SelectField from '@/components/selectField/SelectField';
import { useAddProduct } from '@/lib/hooks/useProduct';

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

export interface FormDataTypes {
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  product_image: FileList;
  count_in_stock: number;
  featured: boolean;
}

const AddProductForm: FC<Props> = () => {
  const formRef = useRef();
  const { data: categories, isError, isLoading } = useGetCategories();

  const {
    mutate: addProduct,
    data: addedProduct,
    isLoading: isAddingProduct,
    isError: isErrorAddungProduct,
    isSuccess: isSuccessAddingProduct,
  } = useAddProduct();

  const form = useForm<FormDataTypes>({
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

  const onSubmit: SubmitHandler<FormDataTypes> = async (data, e) => {
    addProduct({
      ...data,
      product_image: data.product_image[0],
      // other_images: Object.values(data.other_images),
      // other_images: data.other_images[0],
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
          encType="multipart/form-data"
          method="POST"
        >
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
                className={`${
                  errors.product_name?.message && 'border-red-700'
                }`}
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

            <div className="flex-1">
              <Label htmlFor="category">Product Category</Label>
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
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
                            <SelectItem
                              key={category._id}
                              value={category._id}
                              className="capitalize"
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="main_image">Product Image</Label>
              <Input
                type="file"
                id="product_image"
                {...register('product_image', {
                  required: 'Product Image is required',
                })}
                className={`${
                  errors.product_image?.message && 'border-red-700'
                }`}
              />
              <span className="text-xs text-red-700">
                {errors.product_image?.message}
              </span>
            </div>

            {/* <div>
              <Label htmlFor="other_images">Other Images</Label>
              <Input
                type="file"
                multiple
                id="other_images"
                {...register('other_images')}
              />
            </div> */}

            <div className="flex-1">
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
                className={`${
                  errors.count_in_stock?.message && 'border-red-700'
                }`}
              />
              <span className="text-xs text-red-700">
                {errors.count_in_stock?.message}
              </span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start self-start space-x-3 space-y-0 rounded-md border p-4">
                <FormLabel className="">Featured product</FormLabel>
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
            <Button disabled={isAddingProduct}>Add Product</Button>

            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                disabled={isAddingProduct}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default AddProductForm;
