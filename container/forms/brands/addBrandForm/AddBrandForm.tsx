'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DevTool } from '@hookform/devtools';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddCategory } from '@/lib/hooks/useCategory';
import BrandNameInput from '@/components/formInputs/brand/BrandNameInput';
import BrandLogoInput from '@/components/formInputs/brand/BrandLogoInput';
import { useAddBrand } from '@/lib/hooks/useBrands';

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

    addBrand({
      ...data,
      brand_logo: data.brand_logo[0],
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
                disabled={isAddingBrand}
              />
            </div>

            <div className="w-full">
              <BrandLogoInput
                register={register}
                errors={errors}
                disabled={isAddingBrand}
              />
            </div>
          </div>

          <Button disabled={isAddingBrand}>Add Brand</Button>
        </form>
      </Form>
    </>
  );
};

export default AddBrandForm;
