import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormDataTypes } from '@/containers/forms/products/AddProductForm';

interface Props {
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const ProductNameInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="product_name">Product Name</Label>
      <Input
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder="Enter product name"
        id="product_name"
        {...register('product_name', {
          required: 'Product name is required',
        })}
        className={`${errors.product_name?.message && 'border-destructive'}`}
      />
      <span className="text-xs text-destructive">
        {errors.product_name?.message}
      </span>
    </>
  );
};

export default ProductNameInput;
