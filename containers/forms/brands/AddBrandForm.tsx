'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DevTool } from '@hookform/devtools';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BrandNameInput from '@/components/formInputs/brand/BrandNameInput';
import BrandLogoInput from '@/components/formInputs/brand/BrandLogoInput';
import { BrandFormDataTypes } from '@/types';
import useAddBrand from '@/lib/hooks/brands/useAddBrand';
import ImageInput from '@/components/ImageInput';
import FormInput from '@/components/FormInput';

interface Props {}

const AddBrandForm: FC<Props> = () => {
  const {
    mutate: addBrand,
    isLoading: isAddingBrand,
    isError: isErrorAddingBrand,
  } = useAddBrand();

  const form = useForm<BrandFormDataTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;

  const onSubmit: SubmitHandler<BrandFormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    addBrand(data);

    // addBrand({
    //   ...data,
    //   brand_logo: data.brand_logo[0],
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
          {/* <div className="flex gap-2"> */}
          <FormInput
            label="Brand Name"
            placeholder="Enter brand name"
            id="name"
            {...register('name', {
              required: 'Brand name is required',
            })}
            disabled={isAddingBrand}
            error={errors.name?.message}
          />

          {/* <FormInput
            label="Brand Logo"
            type="file"
            id="brand_logo"
            {...register('brand_logo', {
              required: 'Brand Logo is required',
            })}
            disabled={isAddingBrand}
            error={errors.brand_logo?.message}
          /> */}
          {/* </div> */}

          <ImageInput
            label="Brand Logo"
            type="file"
            id="brand_logo"
            {...register('brand_logo', {
              // required: 'Brand Logo is required',
            })}
            disabled={isAddingBrand}
            error={errors.brand_logo?.message}
          />

          {/* <Button disabled={isAddingBrand}>Add Brand</Button> */}
          <Button
            className="w-full flex items-center gap-2"
            disabled={isAddingBrand}
          >
            {isAddingBrand && <div className="spinner"></div>}
            <span>Add Brand</span>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddBrandForm;
