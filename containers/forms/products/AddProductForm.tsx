'use client';

import { FC, useState } from 'react';
import { Form } from '@/components/ui/form';

import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
// import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import ProductNameInput from '@/components/formInputs/product/ProductNameInput';
import ProductBrandInput from '@/components/formInputs/product/ProductBrandInput';
import ProductDescriptionInput from '@/components/formInputs/product/ProductDescriptionInput';
import ProductPriceInput from '@/components/formInputs/product/ProductPriceInput';
import ProductCategoryInput from '@/components/formInputs/product/ProductCategoryInput';
import ProductImageInput from '@/components/formInputs/product/ProductImageInput';
import ProductCountInput from '@/components/formInputs/product/ProductCountInput';
import ProductFeaturedInput from '@/components/formInputs/product/ProductFeaturedInput';
import { BrandTypes, CategoryTypes, ProductFormDataTypes } from '@/types';
import useAddProduct from '@/lib/hooks/products/useAddProduct';
import FormInput from '@/components/FormInput';
import ComboBoxInput from '@/components/ComboBoxInput';
import TextareaInput from '@/components/TextareaInput';
import CheckboxInput from '@/components/CheckboxInput';
import ImageInput from '@/components/ImageInput';

interface Props {
  categories: CategoryTypes[];
  brands: BrandTypes[];
}

const AddProductForm: FC<Props> = ({ categories, brands }) => {
  const [brandsComboboxOpen, setBrandsComboboxOpen] = useState(false);
  const [categoriesComboboxOpen, setCategoriesComboboxOpen] = useState(false);

  const {
    mutate: addProduct,
    data: addedProduct,
    isLoading: isAddingProduct,
    isError: isErrorAddingProduct,
    isSuccess: isSuccessAddingProduct,
  } = useAddProduct();

  const form = useForm<ProductFormDataTypes>({
    defaultValues: { featured: false },
    // resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    clearErrors,
  } = form;

  const onSubmit: SubmitHandler<ProductFormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    addProduct(data);

    // addProduct({
    //   ...data,
    //   product_image: data.product_image[0],
    //   // other_images: Object.values(data.other_images),
    //   // other_images: data.other_images[0],
    // });
  };

  return (
    <>
      {/* <Form {...form}> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        encType="multipart/form-data"
        method="POST"
      >
        <DevTool control={control} />
        <div className="flex gap-2">
          <FormInput
            label="Product Name"
            placeholder="Enter product name"
            id="product_name"
            {...register('product_name', {
              required: 'Product name is required',
            })}
            disabled={isAddingProduct}
            error={errors.product_name?.message}
          />

          <ComboBoxInput
            label="Brand"
            comboboxTriggerProps={{
              ...register('brand', {
                required: {
                  value: true,
                  message: 'Product brand is required',
                },
              }),
            }}
            comboboxOpen={brandsComboboxOpen}
            setComboboxOpen={setBrandsComboboxOpen}
            error={errors.brand?.message}
            comboboxItems={brands.map((brand) => {
              return { id: brand._id, value: brand._id, name: brand.name };
            })}
            onItemSelect={(value) => {
              clearErrors('brand');
              setValue('brand', value);
              console.log('selected brand value:', value);
            }}
            disabled={isAddingProduct}
          />
        </div>

        <TextareaInput
          label="Product Description"
          placeholder="Enter product description"
          id="description"
          {...register('description', {
            required: 'Product description is required',
          })}
          disabled={isAddingProduct}
          error={errors.description?.message}
        />

        <div className="flex gap-2">
          <FormInput
            label="Price(₦)"
            type="number"
            id="price"
            step={'any'}
            {...register('price', {
              valueAsNumber: true,
              required: 'Product price is required',
              validate: (value) =>
                value > 0 || 'Product price cannot be less than ₦1',
            })}
            disabled={isAddingProduct}
            error={errors.price?.message}
          />

          <ComboBoxInput
            label="Product Category"
            comboboxTriggerProps={{
              ...register('category', {
                required: {
                  value: true,
                  message: 'Product category is required',
                },
              }),
            }}
            comboboxOpen={categoriesComboboxOpen}
            setComboboxOpen={setCategoriesComboboxOpen}
            error={errors.brand?.message}
            comboboxItems={categories.map((category) => {
              return {
                id: category._id,
                value: category._id,
                name: category.name,
              };
            })}
            onItemSelect={(value) => {
              clearErrors('category');
              setValue('category', value);
              console.log('selected category value:', value);
            }}
            disabled={isAddingProduct}
          />
        </div>

        <div className="flex items-end gap-2">
          {/* <FormInput
            label="Product Image"
            type="file"
            id="product_image"
            {...register('product_image', {
              required: 'Product Image is required',
            })}
            disabled={isAddingProduct}
            error={errors.product_image?.message}
          /> */}

          {/* <div>
              <Label htmlFor="other_images">Other Images</Label>
              <Input
                type="file"
                multiple
                id="other_images"
                {...register('other_images')}
              />
            </div> */}

          <FormInput
            label="Count in Stock"
            type="number"
            id="count_in_stock"
            step={'any'}
            {...register('count_in_stock', {
              valueAsNumber: true,
              required: 'Product count is required',
              validate: (value) =>
                value > 0 || 'Product count cannot be less than 1',
            })}
            disabled={isAddingProduct}
            error={errors.count_in_stock?.message}
          />

          <CheckboxInput
            label="Featured product"
            onCheckedChange={(checked) =>
              setValue('featured', checked as boolean)
            }
            // checked={isProductFeatured}
          />
        </div>

        <ImageInput
          label="Product Image"
          type="file"
          id="product_image"
          {...register('product_image', {
            required: 'Product Image is required',
          })}
          disabled={isAddingProduct}
          error={errors.product_image?.message}
        />

        {/* <Button disabled={isAddingProduct}>Add Product</Button> */}
        <Button
          className="w-full flex items-center gap-2"
          disabled={isAddingProduct}
        >
          {isAddingProduct && <div className="spinner"></div>}
          <span>Add Product</span>
        </Button>
      </form>
      {/* </Form> */}
    </>
  );
};

export default AddProductForm;
