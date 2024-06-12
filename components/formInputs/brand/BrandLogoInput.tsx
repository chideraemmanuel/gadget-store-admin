import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BrandFormDataTypes } from '@/container/forms/brands/addBrandForm/AddBrandForm';

interface Props {
  register: UseFormRegister<BrandFormDataTypes>;
  errors: FieldErrors<BrandFormDataTypes>;
  disabled: boolean;
}

const BrandLogoInput: FC<Props> = ({ register, errors, disabled }) => {
  return (
    <>
      <Label htmlFor="brand_logo">Brand Logo</Label>
      <Input
        disabled={disabled}
        type="file"
        id="brand_logo"
        {...register('brand_logo', {
          required: 'Brand logo is required',
        })}
        className={`${errors.brand_logo?.message && 'border-destructive'}`}
      />
      <span className="text-xs text-destructive">
        {errors.brand_logo?.message}
      </span>
    </>
  );
};

export default BrandLogoInput;
