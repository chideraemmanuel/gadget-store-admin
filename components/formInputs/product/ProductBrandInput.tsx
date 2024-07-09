import { FC, useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { FormDataTypes } from '@/containers/forms/products/AddProductForm';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BrandTypes } from '@/types';

interface Props {
  brands: BrandTypes[];
  form: UseFormReturn<FormDataTypes, any, undefined>;
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const BrandInput: FC<Props> = ({
  brands,
  form,
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  // const {
  //   data: brands,
  //   isError: isErrorFetchingBrands,
  //   isLoading: isFetchingBrands,
  // } = useGetBrands();

  useEffect(() => {
    if (defaultValue) {
      form.setValue('brand', defaultValue);
    }
  }, [defaultValue]);

  console.log('brand def value', defaultValue);

  return (
    <>
      <Label htmlFor="brand">Brand</Label>
      <Select
        onValueChange={(value) => form.setValue('brand', value)}
        defaultValue={defaultValue || form.getValues('brand')}
      >
        <SelectTrigger
          disabled={disabled}
          {...register('brand', {
            required: 'Product brand is required',
          })}
          id="brand"
          className={cn(
            errors.brand?.message && 'border-destructive',
            // 'capitalize',

            // 'w-[200px] justify-between',
            // 'w-full justify-between',
            (form.getValues('brand') || defaultValue) && 'capitalize',
            (!form.getValues('brand') || !defaultValue) &&
              'text-muted-foreground'
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

      <span className="text-xs text-destructive">{errors.brand?.message}</span>
    </>
  );
};

export default BrandInput;
