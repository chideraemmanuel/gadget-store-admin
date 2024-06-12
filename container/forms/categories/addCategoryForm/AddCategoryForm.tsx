'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DevTool } from '@hookform/devtools';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CategoryNameInput from '../../../../components/formInputs/category/CategoryNameInput';
import CategoryBillboardInput from '../../../../components/formInputs/category/CategoryBillboardInput';
import { BillboardReturnTypes, CategoryFormDataTypes } from '@/types';
import useAddCategoryOnClient from '@/lib/hooks/categories/useAddCategoryOnClient';

interface Props {
  billboards: BillboardReturnTypes[];
}

const AddCategoryForm: FC<Props> = ({ billboards }) => {
  const {
    mutate: addCategory,
    isLoading: isAddingCategory,
    isError: isErrorAddingCategory,
  } = useAddCategoryOnClient();

  const form = useForm<CategoryFormDataTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;

  const onSubmit: SubmitHandler<CategoryFormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    addCategory(data);
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
              <CategoryNameInput
                register={register}
                errors={errors}
                disabled={isAddingCategory}
              />
            </div>

            <div className="w-full">
              <CategoryBillboardInput
                billboards={billboards}
                form={form}
                register={register}
                errors={errors}
                disabled={isAddingCategory}
              />
            </div>
          </div>

          <Button disabled={isAddingCategory}>Add Category</Button>
        </form>
      </Form>
    </>
  );
};

export default AddCategoryForm;
