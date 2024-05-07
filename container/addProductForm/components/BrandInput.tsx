import { FC } from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { FormDataTypes } from '../AddProductForm';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetBrands } from '@/lib/hooks/useGetBrands';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

interface Props {
  form: UseFormReturn<FormDataTypes, any, undefined>;
  register: UseFormRegister<FormDataTypes>;
  errors: FieldErrors<FormDataTypes>;
  disabled: boolean;
}

const BrandInput: FC<Props> = ({ form, register, errors, disabled }) => {
  const {
    data: brands,
    isError: isErrorFetchingBrands,
    isLoading: isFetchingBrands,
  } = useGetBrands();
  console.log('brands', brands);
  //   const brands: any[] = [];

  return (
    <>
      {/* <Label htmlFor="brand">Product Brand</Label>
      <Input
        disabled={isAddingProduct}
        placeholder="Enter product brand"
        id="brand"
        {...register('brand', {
          required: 'Product Brand is required',
        })}
        className={`${errors.brand?.message && 'border-red-700'}`}
      />
      <span className="text-xs text-red-700">{errors.brand?.message}</span> */}

      {/* <FormField
        control={control}
        name="brand"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Brand</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      // 'w-[200px] justify-between',
                      'w-full justify-between',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value
                      ? brands?.find((brand) => brand._id === field.value)?.name
                      : 'Select brand'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search brand..." />
                  <CommandEmpty>No brand found.</CommandEmpty>
                  <CommandGroup>
                    {brands &&
                      brands.map((brand) => (
                        <CommandItem
                          value={brand._id}
                          key={brand._id}
                          onSelect={() => {
                            form.setValue('brand', brand._id);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              brand._id === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {brand.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <Label htmlFor="brand">Brand</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            {...register('brand', {
              required: 'Brand is required',
            })}
            id="brand"
            disabled={disabled}
            variant="outline"
            role="combobox"
            className={cn(
              errors.brand?.message && 'border-red-700',

              // 'w-[200px] justify-between',
              'w-full justify-between',
              !form.getValues('brand') && 'text-muted-foreground'
            )}
          >
            {/* {form.getValues('brand')
              ? brands?.find((brand) => brand._id === form.getValues('brand'))
                  ?.name
              : 'Select brand'} */}
            Select brand
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <span className="text-xs text-red-700">{errors.brand?.message}</span>

        <PopoverContent className="w-full p-0">
          <Command
          // className="w-full"
          // {...register('brand', {
          //   required: 'Product Name is required',
          // })}
          // id="brand"
          >
            <CommandInput
              placeholder="Search brand..."
              // {...register('brand', {
              //   required: 'Brand is required',
              // })}
              // id="brand"
            />
            <CommandEmpty>No brand found.</CommandEmpty>
            <CommandGroup>
              {/* {brands &&
                        brands.map((brand) => (
                          <CommandItem
                            // {...register('brand', {
                            //   required: 'Brand is required',
                            // })}
                            // id="brand"
                            value={brand._id}
                            key={brand._id}
                            onSelect={() => {
                              form.setValue('brand', brand._id);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                brand._id === form.getValues('brand')
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {brand.name}
                          </CommandItem>
                        ))} */}

              <CommandItem onSelect={() => {}}>
                <Check className={cn('mr-2 h-4 w-4')} />
                Hi
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default BrandInput;
