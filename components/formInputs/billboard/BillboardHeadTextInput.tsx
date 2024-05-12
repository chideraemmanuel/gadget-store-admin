import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BillboardFormDataTypes } from '@/container/forms/billboards/addBillboardForm/AddBillboardForm';

interface Props {
  register: UseFormRegister<BillboardFormDataTypes>;
  errors: FieldErrors<BillboardFormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const BillboardHeadTextInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="billboard_head_text">Billboard Head Text</Label>
      <Input
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder="Enter billboard head text"
        id="billboard_head_text"
        {...register('head_text', {
          required: 'Head text is required',
        })}
        className={`${errors.head_text?.message && 'border-red-700'}`}
      />
      <span className="text-xs text-red-700">{errors.head_text?.message}</span>
    </>
  );
};

export default BillboardHeadTextInput;
