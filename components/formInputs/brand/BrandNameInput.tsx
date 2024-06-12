import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BrandFormDataTypes } from '@/container/forms/brands/addBrandForm/AddBrandForm';

interface Props {
  register: UseFormRegister<BrandFormDataTypes>;
  errors: FieldErrors<BrandFormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const BrandNameInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="brand_name">Brand Name</Label>
      <Input
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder="Enter brand name"
        id="brand_name"
        {...register('name', {
          required: 'Brand name is required',
        })}
        className={`${errors.name?.message && 'border-destructive'}`}
      />
      <span className="text-xs text-destructive">{errors.name?.message}</span>
    </>
  );
};

export default BrandNameInput;
