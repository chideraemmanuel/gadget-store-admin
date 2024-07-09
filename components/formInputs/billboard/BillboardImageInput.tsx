import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BillboardFormDataTypes } from '@/containers/forms/billboards/AddBillboardForm';

interface Props {
  register: UseFormRegister<BillboardFormDataTypes>;
  errors: FieldErrors<BillboardFormDataTypes>;
  disabled: boolean;
}

const BillboardImageInput: FC<Props> = ({ register, errors, disabled }) => {
  return (
    <>
      <Label htmlFor="billboard_image">Billboard Image</Label>
      <Input
        disabled={disabled}
        type="file"
        id="billboard_image"
        {...register('billboard_image', {
          required: 'Billboard image is required',
        })}
        className={`${errors.billboard_image?.message && 'border-destructive'}`}
      />
      <span className="text-xs text-destructive">
        {errors.billboard_image?.message}
      </span>
    </>
  );
};

export default BillboardImageInput;
