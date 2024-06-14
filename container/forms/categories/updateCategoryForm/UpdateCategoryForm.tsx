'use client';

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import CategoryNameInput from '@/components/formInputs/category/CategoryNameInput';
import CategoryBillboardInput from '@/components/formInputs/category/CategoryBillboardInput';
import {
  BillboardTypes,
  CategoryFormDataTypes,
  CategoryTypes,
  CategoryUpdateTypes,
} from '@/types';
import useUpdateCategoryOnClient from '@/lib/hooks/categories/useUpdateCategoryOnClient';

interface Props {
  category: CategoryTypes;
  billboards: BillboardTypes[];
}

const UpdateCategoryForm: FC<Props> = ({ category, billboards }) => {
  //   const { _id, billboard, name } = category;

  const [formChanged, setFormChanged] = useState(false);

  const {
    mutate: updateCategory,
    data: updatedCategory,
    isLoading: isUpdatingCategory,
    isError: isErrorUpdateingCategory,
    isSuccess: isSuccessUpdateingCategory,
  } = useUpdateCategoryOnClient();

  const form = useForm<CategoryFormDataTypes>();

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
    //   name: `${watchedFormFields.name} - ${category.name}`,
    //   billboard: `${watchedFormFields.billboard} - ${category.billboard._id}`,
    // });
    // console.log('type comparison', {
    //   name: `${typeof watchedFormFields.name} - ${typeof category.name}`,
    //   billboard: `${typeof watchedFormFields.billboard} - ${typeof category
    //     .billboard._id}`,
    // });

    // console.log('watched category', watchedFormFields.billboard);
    // console.log('selected category', selectedCategory);

    if (
      watchedFormFields.name !== category.name ||
      watchedFormFields.billboard !== category.billboard._id
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

  const onSubmit: SubmitHandler<CategoryFormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    const formValues = getValues();

    console.log('form values', formValues);

    // BUILD UPDATES
    const updates: CategoryUpdateTypes = {};

    if (formValues.name !== category.name) {
      updates.name = formValues.name;
    }

    if (formValues.billboard !== category.billboard._id) {
      updates.billboard = formValues.billboard;
    }

    console.log('final update', updates);

    updateCategory({
      categoryId: category._id,
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
              <CategoryNameInput
                register={register}
                errors={errors}
                disabled={isUpdatingCategory}
                defaultValue={category.name}
              />
            </div>

            <div className="w-full">
              <CategoryBillboardInput
                billboards={billboards}
                form={form}
                register={register}
                errors={errors}
                disabled={isUpdatingCategory}
                defaultValue={category.billboard._id}
              />
            </div>
          </div>

          <Button disabled={!formChanged || isUpdatingCategory}>
            Update Category
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateCategoryForm;
