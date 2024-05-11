import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormDataTypes } from '../../../container/addProductForm/AddProductForm';

interface Props {
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const ProductDescriptionInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="description">Product Description</Label>
      <Textarea
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder="Enter product description"
        id="description"
        {...register('description', {
          required: 'Product description is required',
        })}
        className={`resize-none ${
          errors.description?.message && 'border-red-700'
        }`}
      />
      <span className="text-xs text-red-700">
        {errors.description?.message}
      </span>
    </>
  );
};

export default ProductDescriptionInput;
