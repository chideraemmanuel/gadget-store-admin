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
import {
  ProductUpdateTypes,
  ProductReturnTypes,
  useAddProduct,
  useUpdateProduct,
} from '@/lib/hooks/useProduct';
import ProductNameInput from '../../../../components/formInputs/product/ProductNameInput';
import ProductDescriptionInput from '../../../../components/formInputs/product/ProductDescriptionInput';
import ProductPriceInput from '../../../../components/formInputs/product/ProductPriceInput';
import ProductCountInput from '../../../../components/formInputs/product/ProductCountInput';
import ProductCategoryInput from '../../../../components/formInputs/product/ProductCategoryInput';
import ProductBrandInput from '../../../../components/formInputs/product/ProductBrandInput';
import { CategoryReturnTypes } from '@/lib/hooks/useCategory';
import { BrandReturnTypes } from '@/lib/hooks/useBrands';

interface Props {
  product: ProductReturnTypes;
  categories: CategoryReturnTypes[];
  brands: BrandReturnTypes[];
}

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

const UpdateProductForm: FC<Props> = ({ product, categories, brands }) => {
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

    // console.log('watched category', watchedFormFields.category);
    // console.log('selected category', selectedCategory);

    if (
      watchedFormFields.product_name !== product_name ||
      watchedFormFields.brand !== brand._id ||
      watchedFormFields.description !== description ||
      watchedFormFields.price !== price ||
      watchedFormFields.count_in_stock !== count_in_stock ||
      watchedFormFields.category !== category._id ||
      // selectedCategory !== category._id ||
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

    if (formValues.brand !== brand._id) {
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

    if (formValues.category !== category._id) {
      updates.category = formValues.category;
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
              <ProductNameInput
                register={register}
                errors={errors}
                disabled={isUpdatingProduct}
                defaultValue={product_name}
              />
            </div>

            <div className="w-full">
              <ProductBrandInput
                brands={brands}
                form={form}
                register={register}
                errors={errors}
                disabled={isUpdatingProduct}
                defaultValue={brand._id}
              />
            </div>
          </div>

          <div>
            <ProductDescriptionInput
              register={register}
              errors={errors}
              disabled={isUpdatingProduct}
              defaultValue={description}
            />
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <ProductPriceInput
                register={register}
                errors={errors}
                disabled={isUpdatingProduct}
                defaultValue={price}
              />
            </div>

            {/* <div className="flex-1"> */}
            <div className="w-full">
              <ProductCategoryInput
                categories={categories}
                form={form}
                register={register}
                errors={errors}
                disabled={isUpdatingProduct}
                defaultValue={category._id}
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
                  errors.product_image?.message && 'border-destructive'
                }`}
              />
              <span className="text-xs text-destructive">
                {errors.product_image?.message}
              </span>
            </div>

            <div className="flex-1">
              <ProductCountInput
                register={register}
                errors={errors}
                disabled={isUpdatingProduct}
                defaultValue={count_in_stock}
              />
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
