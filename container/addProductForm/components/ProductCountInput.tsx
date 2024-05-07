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

const ProductCountInput: FC<Props> = ({ register, errors, disabled }) => {
  return (
    <>
      <Label htmlFor="count_in_stock">Count in Stock</Label>
      <Input
        disabled={disabled}
        type="number"
        id="count_in_stock"
        {...register('count_in_stock', {
          valueAsNumber: true,
          required: 'Add product price',
          validate: (value) =>
            value > 0 || 'Count in stock cannot be less than 1',
        })}
        className={`${errors.count_in_stock?.message && 'border-red-700'}`}
      />
      <span className="text-xs text-red-700">
        {errors.count_in_stock?.message}
      </span>
    </>
  );
};

export default ProductCountInput;
