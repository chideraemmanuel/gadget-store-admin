'use client';

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
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
// import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import useGetCategories, {
  CategoryReturnTypes,
} from '@/lib/hooks/useGetCategories';
import SelectField from '@/components/selectField/SelectField';
import {
  ProductUpdateTypes,
  ProductsReturnTypes,
  useAddProduct,
  useUpdateProduct,
} from '@/lib/hooks/useProduct';

interface Props {
  product: ProductsReturnTypes;
  categories: CategoryReturnTypes[];
}

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

const UpdateProductForm: FC<Props> = ({ product, categories }) => {
  const {
    product_name,
    brand,
    description,
    price,
    category,
    count_in_stock,
    product_image,
    featured,
  } = product;

  const [formChanged, setFormChanged] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category._id);
  const [isProductFeatured, setIsProductFeatured] = useState(featured);

  const {
    mutate: updateProduct,
    data: updatedProduct,
    isLoading: isUpdatingProduct,
    isError: isErrorUpdateingProduct,
    isSuccess: isSuccessUpdateingProduct,
  } = useUpdateProduct();

  const form = useForm<FormDataTypes>({
    // defaultValues: { featured: false },
    // resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = form;

  const watchedFormFields = watch();

  const hasFormChanged = () => {
    // console.log('comparison', {
    //   product_name: `${watchedFormFields.product_name} - ${product_name}`,
    //   brand: `${watchedFormFields.brand} - ${brand}`,
    //   description: `${watchedFormFields.description} - ${description}`,
    //   price: `${watchedFormFields.price} - ${price}`,
    //   count_in_stock: `${watchedFormFields.count_in_stock} - ${count_in_stock}`,
    //   category: `${selectedCategory} - ${category._id}`,
    //   featured: `${isProductFeatured} - ${featured}`,
    // });
    // console.log('type comparison', {
    //   product_name: `${typeof watchedFormFields.product_name} - ${typeof product_name}`,
    //   brand: `${typeof watchedFormFields.brand} - ${typeof brand}`,
    //   description: `${typeof watchedFormFields.description} - ${typeof description}`,
    //   price: `${typeof watchedFormFields.price} - ${typeof price}`,
    //   count_in_stock: `${typeof watchedFormFields.count_in_stock} - ${typeof count_in_stock}`,
    //   category: `${typeof selectedCategory} - ${typeof category._id}`,
    //   featured: `${typeof isProductFeatured} - ${typeof featured}`,
    // });

    console.log('watched category', watchedFormFields.category);
    console.log('selected category', selectedCategory);

    if (
      watchedFormFields.product_name !== product_name ||
      watchedFormFields.brand !== brand ||
      watchedFormFields.description !== description ||
      watchedFormFields.price !== price ||
      watchedFormFields.count_in_stock !== count_in_stock ||
      // watchedFormFields.category !== category._id
      selectedCategory !== category._id ||
      isProductFeatured !== featured
    ) {
      console.log('form changed');

      return true;
    }

    console.log('form not changed');
    return false;
  };

  useEffect(() => {
    // console.log('useeffect rann!');
    const formChangeStatus = hasFormChanged();

    console.log('form change status', formChangeStatus);
    console.log('form changed state', formChanged);

    if (formChangeStatus) {
      setFormChanged(true);
      return;
    }

    setFormChanged(false);
    console.log('set to false');
  }, [hasFormChanged]);

  const onSubmit: SubmitHandler<FormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    const formValues = getValues();

    console.log('form values', formValues);

    // BUILD UPDATES
    const updates: ProductUpdateTypes = {};

    if (formValues.product_name !== product_name) {
      updates.product_name = formValues.product_name;
    }

    if (formValues.brand !== brand) {
      updates.brand = formValues.brand;
    }

    if (formValues.description !== description) {
      updates.description = formValues.description;
    }

    if (formValues.price !== price) {
      updates.price = formValues.price;
    }

    if (isProductFeatured !== featured) {
      updates.featured = isProductFeatured;
    }

    if (selectedCategory !== category._id) {
      updates.category = selectedCategory;
    }

    if (formValues.count_in_stock !== count_in_stock) {
      updates.count_in_stock = formValues.count_in_stock;
    }

    console.log('final update', updates);

    updateProduct({
      productId: product._id,
      updates,
    });

    // updateProduct({
    //   productId: product._id,
    //   updates: {
    //     ...data,
    //     product_image: data.product_image[0],
    //   },
    // });
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
            <div className="w-full">
              <Label htmlFor="product_name">Product Name</Label>
              <Input
                defaultValue={product_name}
                disabled={isUpdatingProduct}
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

            <div className="w-full">
              <Label htmlFor="brand">Product Brand</Label>
              <Input
                defaultValue={brand}
                disabled={isUpdatingProduct}
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
              defaultValue={description}
              disabled={isUpdatingProduct}
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
            <div className="w-full">
              <Label htmlFor="price">Price</Label>
              <Input
                defaultValue={price}
                disabled={isUpdatingProduct}
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

            {/* <div className="flex-1"> */}
            <div className="w-full">
              <Label htmlFor="category">Product Category</Label>
              <FormField
                disabled={isUpdatingProduct}
                control={control}
                name="category"
                render={({ field }) => {
                  // field.value = category._id;

                  // console.log('field value', field.value);

                  return (
                    <FormItem>
                      <Select
                        // onValueChange={field.onChange}
                        onValueChange={(value) => {
                          /*
                           Handle change manually using useState (because defaultValue does not actually set field.value to category._id, but it displays the corresponding category name on the component??)
                          
                           Did this because, on component render, the appropriate category name is selected on this component(thanks to defaultValue), but the actual field value is not set, thereby making the return value of hasFormChanged() true, which is wrong!
                          */

                          // field.onChange(); // doesn't do anything :D
                          // field.value = value; // doesn't do aything either :D

                          form.setValue('category', value);

                          setSelectedCategory(value);
                        }}
                        // defaultValue={field.value}
                        defaultValue={category._id}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="category"
                            className="capitalize"
                            disabled={isUpdatingProduct}
                          >
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
                  );
                }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="main_image">Product Image</Label>
              <Input
                disabled={isUpdatingProduct}
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

            <div className="flex-1">
              <Label htmlFor="count_in_stock">Count in Stock</Label>
              <Input
                defaultValue={count_in_stock}
                disabled={isUpdatingProduct}
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
                    disabled={isUpdatingProduct}
                    className=""
                    // checked={field.value}
                    defaultChecked={featured}
                    checked={isProductFeatured}
                    // onCheckedChange={field.onChange}
                    onCheckedChange={(checked: boolean) => {
                      console.log('is checked?', checked);

                      setIsProductFeatured(checked);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={!formChanged || isUpdatingProduct}>
            Update Product
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateProductForm;
