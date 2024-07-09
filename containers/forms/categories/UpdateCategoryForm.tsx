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
import useUpdateCategory from '@/lib/hooks/categories/useUpdateCategory';
import FormInput from '@/components/FormInput';
import ComboBoxInput from '@/components/ComboBoxInput';

interface Props {
  category: CategoryTypes;
  billboards: BillboardTypes[];
}

const UpdateCategoryForm: FC<Props> = ({ category, billboards }) => {
  //   const { _id, billboard, name } = category;
  const [billboardsComboboxOpen, setBillboardsComboboxOpen] = useState(false);

  const [formChanged, setFormChanged] = useState(false);

  const {
    mutate: updateCategory,
    data: updatedCategory,
    isLoading: isUpdatingCategory,
    isError: isErrorUpdateingCategory,
    isSuccess: isSuccessUpdateingCategory,
  } = useUpdateCategory();

  const form = useForm<CategoryFormDataTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setValue,
    clearErrors,
  } = form;

  const watchedFormFields = watch();

  const trackFormChange = () => {
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

  const onSubmit: SubmitHandler<CategoryFormDataTypes> = async (data, e) => {
    // IN CASE USER USES ENTER KEY TO SUBMIT
    if (!formChanged) {
      return;
    }

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
            label="Category Name"
            defaultValue={category.name}
            placeholder="Enter category name"
            id="name"
            {...register('name', {
              required: 'Product name is required',
            })}
            disabled={isUpdatingCategory}
            error={errors.name?.message}
          />

          <ComboBoxInput
            label="Category Billboard"
            defautlValue={{
              id: category.billboard._id,
              value: category.billboard._id,
              name: category.billboard.name,
            }}
            comboboxOpen={billboardsComboboxOpen}
            setComboboxOpen={setBillboardsComboboxOpen}
            error={errors.billboard?.message}
            comboboxItems={billboards.map((billboard) => {
              return {
                id: billboard._id,
                value: billboard._id,
                name: billboard.name,
              };
            })}
            onItemSelect={(value) => {
              clearErrors('billboard');
              setValue('billboard', value);
              console.log('selected billboard value:', value);
            }}
          />
        </div>

        {/* <Button disabled={!formChanged || isUpdatingCategory}>
            Update Category
          </Button> */}
        <Button
          className="w-full flex items-center gap-2"
          disabled={!formChanged || isUpdatingCategory}
        >
          {isUpdatingCategory && <div className="spinner"></div>}
          <span>Update Category</span>
        </Button>
      </form>
      {/* </Form> */}
    </>
  );
};

export default UpdateCategoryForm;
