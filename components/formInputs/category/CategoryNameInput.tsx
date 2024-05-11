import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { CategoryFormDataTypes } from '../../../container/addCategoryForm/AddCategoryForm';

interface Props {
  register: UseFormRegister<CategoryFormDataTypes>;
  errors: FieldErrors<CategoryFormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const CategoryNameInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="category_name">Category Name</Label>
      <Input
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder="Enter category name"
        id="category_name"
        {...register('name', {
          required: 'Category name is required',
        })}
        className={`${errors.name?.message && 'border-red-700'}`}
      />
      <span className="text-xs text-red-700">
        {/* {errors.product_name?.message} */}
      </span>
    </>
  );
};

export default CategoryNameInput;
