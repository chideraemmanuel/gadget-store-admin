'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { BillboardTypes, CategoryFormDataTypes } from '@/types';
import { FC, useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';

interface Props {
  billboards: BillboardTypes[];
  form: UseFormReturn<CategoryFormDataTypes, any, undefined>;
  register: UseFormRegister<CategoryFormDataTypes>;
  errors: FieldErrors<CategoryFormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const CategoryBillboardInput: FC<Props> = ({
  billboards,
  form,
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  // const {
  //   data: categories,
  //   isError: isErrorFetchingCategories,
  //   isLoading: isFetchingCategories,
  // } = useGetCategories();

  useEffect(() => {
    if (defaultValue) {
      form.setValue('billboard', defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <Label htmlFor="billboard">Category Billboard</Label>
      <Select
        onValueChange={(value) => form.setValue('billboard', value)}
        defaultValue={defaultValue || form.getValues('billboard')}
      >
        <SelectTrigger
          disabled={disabled}
          {...register('billboard', {
            required: 'Category billboard is required',
          })}
          id="billboard"
          className={cn(
            errors.billboard?.message && 'border-destructive',
            // 'capitalize',

            // 'w-[200px] justify-between',
            // 'w-full justify-between',
            (form.getValues('billboard') || defaultValue) && 'capitalize',
            (!form.getValues('billboard') || !defaultValue) &&
              'text-muted-foreground'
          )}
        >
          <SelectValue placeholder="Select a billboard" />
        </SelectTrigger>
        <SelectContent>
          {billboards &&
            billboards
              .sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((billboard) => (
                <SelectItem
                  key={billboard._id}
                  value={billboard._id}
                  className="capitalize"
                  onSelect={() => {
                    form.setValue('billboard', billboard._id);
                  }}
                >
                  {billboard.name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>

      <span className="text-xs text-destructive">
        {errors.billboard?.message}
      </span>
    </>
  );
};

export default CategoryBillboardInput;
