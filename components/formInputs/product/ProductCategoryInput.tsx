import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FC, useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { FormDataTypes } from '../../../container/forms/products/addProductForm/AddProductForm';
import { CategoryTypes } from '@/types';

interface Props {
  categories: CategoryTypes[];
  form: UseFormReturn<FormDataTypes, any, undefined>;
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const ProductCategoryInput: FC<Props> = ({
  categories,
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
      form.setValue('category', defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      <Label htmlFor="category">Product Category</Label>
      {/* <FormField
                disabled={isAddingProduct}
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories &&
                          categories.map((category) => (
                            <SelectItem
                              key={category._id}
                              value={category._id}
                              className="capitalize"
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
      <Select
        onValueChange={(value) => form.setValue('category', value)}
        defaultValue={defaultValue || form.getValues('category')}
      >
        <SelectTrigger
          disabled={disabled}
          {...register('category', {
            required: 'Product category is required',
          })}
          id="category"
          className={cn(
            errors.category?.message && 'border-destructive',
            // 'capitalize',

            // 'w-[200px] justify-between',
            // 'w-full justify-between',
            (form.getValues('category') || defaultValue) && 'capitalize',
            (!form.getValues('category') || !defaultValue) &&
              'text-muted-foreground'
          )}
        >
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories &&
            categories
              .sort((a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              })
              .map((category) => (
                <SelectItem
                  key={category._id}
                  value={category._id}
                  className="capitalize"
                  onSelect={() => {
                    form.setValue('category', category._id);
                  }}
                >
                  {category.name}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>

      <span className="text-xs text-destructive">
        {errors.category?.message}
      </span>
    </>
  );
};

export default ProductCategoryInput;
