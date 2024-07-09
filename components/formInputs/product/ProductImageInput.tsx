import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormDataTypes } from '@/containers/forms/products/AddProductForm';

interface Props {
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
}

const ProductImageInput: FC<Props> = ({ register, errors, disabled }) => {
  return (
    <>
      <Label htmlFor="product_image">Product Image</Label>
      <Input
        disabled={disabled}
        type="file"
        id="product_image"
        {...register('product_image', {
          required: 'Product image is required',
        })}
        className={`${errors.product_image?.message && 'border-destructive'}`}
      />
      <span className="text-xs text-destructive">
        {errors.product_image?.message}
      </span>
    </>
  );
};

export default ProductImageInput;
