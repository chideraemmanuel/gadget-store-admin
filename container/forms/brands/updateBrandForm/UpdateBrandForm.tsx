'use client';

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import {
  CategoryReturnTypes,
  CategoryUpdateTypes,
  useUpdateCategory,
} from '@/lib/hooks/useCategory';
import CategoryNameInput from '@/components/formInputs/category/CategoryNameInput';
import CategoryBillboardInput from '@/components/formInputs/category/CategoryBillboardInput';
import { BillboardReturnTypes } from '@/lib/hooks/useBillboard';
import { BrandReturnTypes, useUpdateBrand } from '@/lib/hooks/useBrands';
import { BrandFormDataTypes } from '../addBrandForm/AddBrandForm';
import BrandNameInput from '@/components/formInputs/brand/BrandNameInput';
import BrandLogoInput from '@/components/formInputs/brand/BrandLogoInput';

interface Props {
  brand: BrandReturnTypes;
}

const UpdateBrandForm: FC<Props> = ({ brand }) => {
  //   const { _id, billboard, name } = category;

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

  const hasFormChanged = () => {
    // console.log('comparison', {
    //   name: `${watchedFormFields.name} - ${brand.name}`,
    // });
    // console.log('type comparison', {
    //   name: `${typeof watchedFormFields.name} - ${typeof brand.name}`,
    // });

    if (watchedFormFields.name !== brand.name) {
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

  const onSubmit: SubmitHandler<BrandFormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    const formValues = getValues();

    console.log('form values', formValues);

    // BUILD UPDATES
    const updates: CategoryUpdateTypes = {};

    if (formValues.name !== brand.name) {
      updates.name = formValues.name;
    }

    console.log('final update', updates);

    updateBrand({
      brandId: brand._id,
      updates,
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
            <div className="w-full">
              <BrandNameInput
                register={register}
                errors={errors}
                disabled={isUpdatingBrand}
                defaultValue={brand.name}
              />
            </div>

            <div className="w-full">
              <BrandLogoInput
                register={register}
                errors={errors}
                disabled={isUpdatingBrand}
              />
            </div>
          </div>

          <Button disabled={!formChanged || isUpdatingBrand}>
            Update Brand
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateBrandForm;
