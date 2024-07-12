'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DevTool } from '@hookform/devtools';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CategoryNameInput from '@/components/formInputs/category/CategoryNameInput';
import CategoryBillboardInput from '@/components/formInputs/category/CategoryBillboardInput';
import { BillboardTypes, CategoryFormDataTypes } from '@/types';
import useAddCategory from '@/lib/hooks/categories/useAddCategory';
import FormInput from '@/components/FormInput';
import ComboBoxInput from '@/components/ComboBoxInput';

interface Props {
  billboards: BillboardTypes[];
}

const AddCategoryForm: FC<Props> = ({ billboards }) => {
  const [billboardsComboboxOpen, setBillboardsComboboxOpen] = useState(false);

  const {
    mutate: addCategory,
    isLoading: isAddingCategory,
    isError: isErrorAddingCategory,
  } = useAddCategory();

  const form = useForm<CategoryFormDataTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    clearErrors,
  } = form;

  const onSubmit: SubmitHandler<CategoryFormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    addCategory(data);
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
            placeholder="Enter category name"
            id="name"
            {...register('name', {
              required: 'Product name is required',
            })}
            disabled={isAddingCategory}
            error={errors.name?.message}
            className="capitalize"
          />

          <ComboBoxInput
            label="Category Billboard"
            comboboxTriggerProps={{
              ...register('billboard', {
                required: {
                  value: true,
                  message: 'Billboard is required',
                },
              }),
              className: 'capitalize',
            }}
            comboboxItemProps={{ className: 'capitalize' }}
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
            disabled={isAddingCategory}
          />
        </div>

        {/* <Button disabled={isAddingCategory}>Add Category</Button> */}
        <Button
          className="w-full flex items-center gap-2"
          disabled={isAddingCategory}
        >
          {isAddingCategory && <div className="spinner"></div>}
          <span>Add Category</span>
        </Button>
      </form>
      {/* </Form> */}
    </>
  );
};

export default AddCategoryForm;
