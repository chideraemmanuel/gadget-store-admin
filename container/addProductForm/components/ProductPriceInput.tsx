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

const ProductPriceInput: FC<Props> = ({ register, errors, disabled }) => {
  return (
    <>
      <Label htmlFor="price">Price</Label>
      <Input
        disabled={disabled}
        type="number"
        id="price"
        step={'any'}
        {...register('price', {
          valueAsNumber: true,
          required: 'Add product price',
          validate: (value) => value > 0 || 'Price cannot be less than $1',
        })}
        className={`${errors.price?.message && 'border-red-700'}`}
      />
      <span className="text-xs text-red-700">{errors.price?.message}</span>
    </>
  );
};

export default ProductPriceInput;
