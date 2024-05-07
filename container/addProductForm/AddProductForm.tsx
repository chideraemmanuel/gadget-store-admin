'use client';

import { FC } from 'react';
import { Form } from '@/components/ui/form';

import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
// import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { useAddProduct } from '@/lib/hooks/useProduct';
import ProductNameInput from './components/ProductNameInput';
import BrandInput from './components/ProductBrandInput';
import ProductDescriptionInput from './components/ProductDescriptionInput';
import ProductPriceInput from './components/ProductPriceInput';
import ProductCategoryInput from './components/ProductCategoryInput';
import ProductImageInput from './components/ProductImageInput';
import ProductCountInput from './components/ProductCountInput';
import ProductFeaturedInput from './components/ProductFeaturedInput';

interface Props {}

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
  const {
    mutate: addProduct,
    data: addedProduct,
    isLoading: isAddingProduct,
    isError: isErrorAddingProduct,
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
    console.log('submitted data', data);
    // addProduct({
    //   ...data,
    //   product_image: data.product_image[0],
    //   // other_images: Object.values(data.other_images),
    //   // other_images: data.other_images[0],
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
                disabled={isAddingProduct}
              />
            </div>

            <div className="w-full">
              <BrandInput
                form={form}
                register={register}
                errors={errors}
                disabled={isAddingProduct}
              />
            </div>
          </div>

          <div>
            <ProductDescriptionInput
              register={register}
              errors={errors}
              disabled={isAddingProduct}
            />
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <ProductPriceInput
                register={register}
                errors={errors}
                disabled={isAddingProduct}
              />
            </div>

            <div className="w-full">
              <ProductCategoryInput
                form={form}
                register={register}
                errors={errors}
                disabled={isAddingProduct}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <ProductImageInput
                register={register}
                errors={errors}
                disabled={isAddingProduct}
              />
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
              <ProductCountInput
                register={register}
                errors={errors}
                disabled={isAddingProduct}
              />
            </div>
          </div>

          <ProductFeaturedInput
            form={form}
            register={register}
            errors={errors}
            disabled={isAddingProduct}
          />

          <Button disabled={isAddingProduct}>Add Product</Button>
        </form>
      </Form>
    </>
  );
};

export default AddProductForm;
