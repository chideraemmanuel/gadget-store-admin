import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormDataTypes } from '../AddProductForm';

interface Props {
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
}

const ProductNameInput: FC<Props> = ({ register, errors, disabled }) => {
  return (
    <>
      <Label htmlFor="product_name">Product Name</Label>
      <Input
        disabled={disabled}
        placeholder="Enter product name"
        id="product_name"
        {...register('product_name', {
          required: 'Product Name is required',
        })}
        className={`${errors.product_name?.message && 'border-red-700'}`}
      />
      <span className="text-xs text-red-700">
        {errors.product_name?.message}
      </span>
    </>
  );
};

export default ProductNameInput;
