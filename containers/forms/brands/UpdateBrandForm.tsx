'use client';

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import BrandNameInput from '@/components/formInputs/brand/BrandNameInput';
import BrandLogoInput from '@/components/formInputs/brand/BrandLogoInput';
import { BrandFormDataTypes, BrandTypes, BrandUpdateTypes } from '@/types';
import useUpdateBrand from '@/lib/hooks/brands/useUpdateBrand';
import FormInput from '@/components/FormInput';
import ImageInput from '@/components/ImageInput';

interface Props {
  brand: BrandTypes;
}

const UpdateBrandForm: FC<Props> = ({ brand }) => {
  const [formChanged, setFormChanged] = useState(false);

  const {
    mutate: updateBrand,
    data: updatedBrand,
    isLoading: isUpdatingBrand,
    isError: isErrorUpdateingBrand,
    isSuccess: isSuccessUpdateingBrand,
  } = useUpdateBrand();

  const form = useForm<BrandFormDataTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = form;

  const watchedFormFields = watch();

  const trackFormChange = () => {
    // console.log('comparison', {
    //   name: `${watchedFormFields.name} - ${brand.name}`,
    // });
    // console.log('type comparison', {
    //   name: `${typeof watchedFormFields.name} - ${typeof brand.name}`,
    // });

    if (watchedFormFields.name !== brand.name || watchedFormFields.brand_logo) {
      console.log('form has changed');
      setFormChanged(true);
    } else {
      console.log('form has not changed');
      setFormChanged(false);
    }
  };

  useEffect(() => {
    trackFormChange();
  }, [watchedFormFields]);

  // useEffect(() => {
  //   // console.log('useeffect rann!');
  //   const formChangeStatus = hasFormChanged();

  //   console.log('form change status', formChangeStatus);
  //   console.log('form changed state', formChanged);

  //   if (formChangeStatus) {
  //     setFormChanged(true);
  //     return;
  //   }

  //   setFormChanged(false);
  //   console.log('set to false');
  // }, [hasFormChanged]);

  const onSubmit: SubmitHandler<BrandFormDataTypes> = async (data, e) => {
    // IN CASE USER USES ENTER KEY TO SUBMIT
    if (!formChanged) {
      return;
    }

    console.log('submitted data', data);

    const formValues = getValues();

    console.log('form values', formValues);

    // BUILD UPDATES
    const updates: BrandUpdateTypes = {};

    if (formValues.name !== brand.name) {
      updates.name = formValues.name;
    }

    if (formValues.brand_logo) {
      updates.brand_logo = formValues.brand_logo;
    }

    console.log('final update', updates);

    updateBrand({
      brandId: brand._id,
      updates,
    });
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
        {/* <div className="flex gap-2"> */}
        <FormInput
          label="Brand Name"
          defaultValue={brand.name}
          placeholder="Enter brand name"
          id="name"
          {...register('name', {
            required: 'Brand name is required',
          })}
          disabled={isUpdatingBrand}
          error={errors.name?.message}
        />

        {/* <FormInput
          label="Brand Logo"
          type="file"
          id="brand_logo"
          defaultValue={brand.brand_logo}
          {...register('brand_logo', {
            required: 'Brand Logo is required',
          })}
          disabled={isUpdatingBrand}
          error={errors.brand_logo?.message}
        /> */}
        {/* </div> */}

        <ImageInput
          label="Brand Logo"
          type="file"
          id="brand_logo"
          defaultImage={brand.brand_logo}
          {...register('brand_logo', {
            // required: 'Brand Logo is required',
          })}
          disabled={isUpdatingBrand}
          error={errors.brand_logo?.message}
        />

        {/* <Button disabled={!formChanged || isUpdatingBrand}>Update Brand</Button> */}
        <Button
          className="w-full flex items-center gap-2"
          disabled={!formChanged || isUpdatingBrand}
        >
          {isUpdatingBrand && <div className="spinner"></div>}
          <span>Update Brand</span>
        </Button>
      </form>
      {/* </Form> */}
    </>
  );
};

export default UpdateBrandForm;
