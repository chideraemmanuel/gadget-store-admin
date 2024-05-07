import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { FormDataTypes } from '../AddProductForm';
import useGetCategories from '@/lib/hooks/useGetCategories';

interface Props {
  form: UseFormReturn<FormDataTypes, any, undefined>;
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
  defaultValue?: string;
}

const ProductCategoryInput: FC<Props> = ({
  form,
  register,
  errors,
  disabled,
  defaultValue,
}) => {
  const {
    data: categories,
    isError: isErrorFetchingCategories,
    isLoading: isFetchingCategories,
  } = useGetCategories();

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
          {...register('category', {
            required: 'Product category is required',
          })}
          id="category"
          className={cn(
            errors.category?.message && 'border-red-700',
            // 'capitalize',

            // 'w-[200px] justify-between',
            // 'w-full justify-between',
            form.getValues('category') && 'capitalize',
            !form.getValues('category') && 'text-muted-foreground'
          )}
        >
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories &&
            categories.map((category) => (
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

      <span className="text-xs text-red-700">{errors.category?.message}</span>
    </>
  );
};

export default ProductCategoryInput;
