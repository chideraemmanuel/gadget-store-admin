import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BillboardFormDataTypes } from '@/container/forms/billboards/addBillboardForm/AddBillboardForm';

interface Props {
  register: UseFormRegister<BillboardFormDataTypes>;
  errors: FieldErrors<BillboardFormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const BillboardParagraphInput: FC<Props> = ({
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  return (
    <>
      <Label htmlFor="billboard_paragraph">Billboard paragraph</Label>
      <Textarea
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder="Enter billboard paragraph"
        id="billboard_paragraph"
        {...register('paragraph', {
          //   required: 'Billboard paragraph is required',
        })}
        className={`resize-none ${
          errors.paragraph?.message && 'border-red-700'
        }`}
      />
      <span className="text-xs text-red-700">{errors.paragraph?.message}</span>
    </>
  );
};

export default BillboardParagraphInput;
