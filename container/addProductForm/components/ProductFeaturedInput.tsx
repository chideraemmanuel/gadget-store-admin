import { FC } from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { FormDataTypes } from '../AddProductForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  form: UseFormReturn<FormDataTypes, any, undefined>;
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
}

const ProductFeaturedInput: FC<Props> = ({
  form,
  register,
  errors,
  disabled,
}) => {
  return (
    <>
      <FormField
        disabled={disabled}
        control={form.control}
        name="featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start self-start space-x-3 space-y-0 rounded-md border p-4">
            <FormLabel className="">Featured product</FormLabel>
            <FormControl className="">
              <Checkbox
                className=""
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductFeaturedInput;
