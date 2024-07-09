import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BillboardFormDataTypes } from '@/containers/forms/billboards/AddBillboardForm';

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
          errors.paragraph?.message && 'border-destructive'
        }`}
      />
      <span className="text-xs text-destructive">
        {errors.paragraph?.message}
      </span>
    </>
  );
};

export default BillboardParagraphInput;
