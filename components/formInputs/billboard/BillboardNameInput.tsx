import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BillboardFormDataTypes } from '@/containers/forms/billboards/AddBillboardForm';

interface Props {
  register: UseFormRegister<BillboardFormDataTypes>;
  errors: FieldErrors<BillboardFormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const BillboardNameInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="billboard_name">Billboard Name</Label>
      <Input
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder="Enter billboard name"
        id="billboard_name"
        {...register('name', {
          required: 'Billboard name is required',
        })}
        className={`${errors.name?.message && 'border-destructive'}`}
      />
      <span className="text-xs text-destructive">{errors.name?.message}</span>
    </>
  );
};

export default BillboardNameInput;
