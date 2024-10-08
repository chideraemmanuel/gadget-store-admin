import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormDataTypes } from '@/containers/forms/products/AddProductForm';

interface Props {
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
  defaultValue?: number;
}

const ProductPriceInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="price">Price</Label>
      <Input
        defaultValue={defaultValue}
        disabled={disabled}
        type="number"
        id="price"
        step={'any'}
        {...register('price', {
          valueAsNumber: true,
          required: 'Product price is required',
          validate: (value) => value > 0 || 'Price cannot be less than $1',
        })}
        className={`${errors.price?.message && 'border-destructive'}`}
      />
      <span className="text-xs text-destructive">{errors.price?.message}</span>
    </>
  );
};

export default ProductPriceInput;
