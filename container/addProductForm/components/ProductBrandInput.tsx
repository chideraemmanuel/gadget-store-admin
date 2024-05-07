import { FC, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { FormDataTypes } from '../AddProductForm';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useGetBrands } from '@/lib/hooks/useGetBrands';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  form: UseFormReturn<FormDataTypes, any, undefined>;
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const BrandInput: FC<Props> = ({
  form,
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  const {
    data: brands,
    isError: isErrorFetchingBrands,
    isLoading: isFetchingBrands,
  } = useGetBrands();

  return (
    <>
      <Label htmlFor="brand">Brand</Label>
      <Select
        onValueChange={(value) => form.setValue('brand', value)}
        defaultValue={defaultValue || form.getValues('brand')}
      >
        <SelectTrigger
          {...register('brand', {
            required: 'Product brand is required',
          })}
          id="brand"
          className={cn(
            errors.brand?.message && 'border-red-700',
            // 'capitalize',

            // 'w-[200px] justify-between',
            // 'w-full justify-between',
            form.getValues('brand') && 'capitalize',
            !form.getValues('brand') && 'text-muted-foreground'
          )}
        >
          <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
          {brands &&
            brands
              .sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((brand) => (
                <SelectItem
                  key={brand._id}
                  value={brand._id}
                  className="capitalize"
                  onSelect={() => {
                    form.setValue('brand', brand._id);
                  }}
                >
                  {brand.name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>

      <span className="text-xs text-red-700">{errors.brand?.message}</span>
    </>
  );
};

export default BrandInput;
