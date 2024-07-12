'use client';

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
// import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import ProductNameInput from '@/components/formInputs/product/ProductNameInput';
import ProductDescriptionInput from '@/components/formInputs/product/ProductDescriptionInput';
import ProductPriceInput from '@/components/formInputs/product/ProductPriceInput';
import ProductCountInput from '@/components/formInputs/product/ProductCountInput';
import ProductCategoryInput from '@/components/formInputs/product/ProductCategoryInput';
import ProductBrandInput from '@/components/formInputs/product/ProductBrandInput';
import {
  BrandTypes,
  CategoryTypes,
  ProductTypes,
  ProductUpdateTypes,
  ProductFormDataTypes,
} from '@/types';
import useUpdateProduct from '@/lib/hooks/products/useUpdateProduct';
import FormInput from '@/components/FormInput';
import TextareaInput from '@/components/TextareaInput';
import ComboBoxInput from '@/components/ComboBoxInput';
import CheckboxInput from '@/components/CheckboxInput';
import ImageInput from '@/components/ImageInput';

interface Props {
  product: ProductTypes;
  categories: CategoryTypes[];
  brands: BrandTypes[];
}

const UpdateProductForm: FC<Props> = ({ product, categories, brands }) => {
  const {
    product_name,
    brand,
    description,
    price,
    category,
    count_in_stock,
    product_image,
    featured,
  } = product;

  const [formChanged, setFormChanged] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category._id);
  const [isProductFeatured, setIsProductFeatured] = useState(featured);

  const [brandsComboboxOpen, setBrandsComboboxOpen] = useState(false);
  const [categoriesComboboxOpen, setCategoriesComboboxOpen] = useState(false);

  const {
    mutate: updateProduct,
    data: updatedProduct,
    isLoading: isUpdatingProduct,
    isError: isErrorUpdateingProduct,
    isSuccess: isSuccessUpdateingProduct,
  } = useUpdateProduct();

  const form = useForm<ProductFormDataTypes>({
    // defaultValues: { featured: false },
    // resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
    setValue,
    clearErrors,
  } = form;

  const watchedFormFields = watch();

  const trackFormChange = () => {
    console.log('comparison', {
      product_name: `${watchedFormFields.product_name} - ${product_name}`,
      brand: `${watchedFormFields.brand} - ${brand._id}`,
      description: `${watchedFormFields.description} - ${description}`,
      price: `${watchedFormFields.price} - ${price}`,
      count_in_stock: `${watchedFormFields.count_in_stock} - ${count_in_stock}`,
      category: `${watchedFormFields.category} - ${category._id}`,
      featured: `${watchedFormFields.featured} - ${featured}`,
      product_image: watchedFormFields.product_image,
    });
    // console.log('type comparison', {
    //   product_name: `${typeof watchedFormFields.product_name} - ${typeof product_name}`,
    //   brand: `${typeof watchedFormFields.brand} - ${typeof brand}`,
    //   description: `${typeof watchedFormFields.description} - ${typeof description}`,
    //   price: `${typeof watchedFormFields.price} - ${typeof price}`,
    //   count_in_stock: `${typeof watchedFormFields.count_in_stock} - ${typeof count_in_stock}`,
    //   category: `${typeof selectedCategory} - ${typeof category._id}`,
    //   featured: `${typeof isProductFeatured} - ${typeof featured}`,
    // });

    // console.log('watched category', watchedFormFields.category);
    // console.log('selected category', selectedCategory);

    if (
      watchedFormFields.product_name !== product_name ||
      watchedFormFields.brand !== brand._id ||
      watchedFormFields.description !== description ||
      watchedFormFields.price !== price ||
      watchedFormFields.count_in_stock !== count_in_stock ||
      watchedFormFields.category !== category._id ||
      // isProductFeatured !== featured
      watchedFormFields.featured !== featured ||
      watchedFormFields.product_image.length > 0
    ) {
      console.log('form has changed');
      setFormChanged(true);
    } else {
      console.log('form has not changed');
      setFormChanged(false);
    }
  };

  useEffect(() => {
    trackFormChange();
  }, [watchedFormFields]);

  // useEffect(() => {
  //   // console.log('useeffect rann!');
  //   const formHasChanged = trackFormChange();

  //   console.log('form change status', formHasChanged);
  //   console.log('form changed state', formChanged);

  //   if (formHasChanged) {
  //     setFormChanged(true);
  //     return;
  //   }

  //   setFormChanged(false);
  //   console.log('set to false');
  // }, [trackFormChange]);

  // this sets the default value of the combobox inputs for useForm to properly manage
  // this is necessary because, on page load, the defaultValue set on the combobox inputs only shows the proper value in the ui, but doesn't have it's state managed by react hook form
  useEffect(() => {
    console.log('initial load form data:', getValues());
    // setValue('brand', brand._id);
    // setValue('category', category._id);
  }, []);

  const onSubmit: SubmitHandler<ProductFormDataTypes> = async (data, e) => {
    // IN CASE USER USES ENTER KEY TO SUBMIT
    if (!formChanged) {
      return;
    }

    console.log('submitted data', data);

    const formValues = getValues();

    console.log('form values', formValues);

    // BUILD UPDATES
    const updates: ProductUpdateTypes = {};

    if (formValues.product_name !== product_name) {
      updates.product_name = formValues.product_name;
    }

    if (formValues.brand !== brand._id) {
      updates.brand = formValues.brand;
    }

    if (formValues.description !== description) {
      updates.description = formValues.description;
    }

    if (formValues.price !== price) {
      updates.price = formValues.price;
    }

    // if (isProductFeatured !== featured) {
    //   updates.featured = isProductFeatured;
    // }

    if (formValues.featured !== featured) {
      updates.featured = formValues.featured;
    }

    if (formValues.category !== category._id) {
      updates.category = formValues.category;
    }

    if (formValues.count_in_stock !== count_in_stock) {
      updates.count_in_stock = formValues.count_in_stock;
    }

    if (formValues.product_image) {
      updates.product_image = formValues.product_image;
    }

    console.log('final update', updates);

    updateProduct({
      productId: product._id,
      updates,
    });

    // updateProduct({
    //   productId: product._id,
    //   updates: {
    //     ...data,
    //     product_image: data.product_image[0],
    //   },
    // });
  };

  return (
    <>
      {/* <Form {...form}> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        encType="multipart/form-data"
        method="POST"
      >
        <DevTool control={control} />
        <div className="flex gap-2">
          <FormInput
            label="Product Name"
            defaultValue={product_name}
            placeholder="Enter product name"
            id="product_name"
            {...register('product_name', {
              required: 'Product name is required',
            })}
            disabled={isUpdatingProduct}
            error={errors.product_name?.message}
          />

          <ComboBoxInput
            label="Brand"
            defautlValue={{ id: brand._id, value: brand._id, name: brand.name }}
            comboboxTriggerProps={{
              ...register('brand', {
                required: {
                  value: true,
                  message: 'Product brand is required',
                },
              }),
            }}
            comboboxOpen={brandsComboboxOpen}
            setComboboxOpen={setBrandsComboboxOpen}
            error={errors.brand?.message}
            comboboxItems={brands.map((brand) => {
              return { id: brand._id, value: brand._id, name: brand.name };
            })}
            onItemSelect={(value) => {
              clearErrors('brand');
              setValue('brand', value);
              console.log('selected brand value:', value);
            }}
            disabled={isUpdatingProduct}
          />
        </div>

        <TextareaInput
          label="Product Description"
          defaultValue={description}
          placeholder="Enter product description"
          id="description"
          {...register('description', {
            required: 'Product description is required',
          })}
          disabled={isUpdatingProduct}
          error={errors.description?.message}
        />

        <div className="flex gap-2">
          <FormInput
            label="Price(₦)"
            defaultValue={price}
            type="number"
            id="price"
            step={'any'}
            {...register('price', {
              valueAsNumber: true,
              required: 'Product price is required',
              validate: (value) =>
                value > 0 || 'Product price cannot be less than ₦1',
            })}
            disabled={isUpdatingProduct}
            error={errors.price?.message}
          />

          <ComboBoxInput
            label="Product Category"
            defautlValue={{
              id: category._id,
              value: category._id,
              name: category.name,
            }}
            comboboxTriggerProps={{
              ...register('category', {
                required: {
                  value: true,
                  message: 'Product category is required',
                },
              }),
            }}
            comboboxOpen={categoriesComboboxOpen}
            setComboboxOpen={setCategoriesComboboxOpen}
            error={errors.brand?.message}
            comboboxItems={categories.map((category) => {
              return {
                id: category._id,
                value: category._id,
                name: category.name,
              };
            })}
            onItemSelect={(value) => {
              clearErrors('category');
              setValue('category', value);
              console.log('selected category value:', value);
            }}
            disabled={isUpdatingProduct}
          />
        </div>

        <div className="flex items-end gap-2">
          {/* <FormInput
            label="Product Image"
            type="file"
            id="product_image"
            defaultValue={product_image}
            {...register('product_image', {
              required: 'Product Image is required',
            })}
            disabled={isUpdatingProduct}
            error={errors.product_image?.message}
          /> */}

          <FormInput
            label="Count in Stock"
            defaultValue={count_in_stock}
            type="number"
            id="count_in_stock"
            step={'any'}
            {...register('count_in_stock', {
              valueAsNumber: true,
              required: 'Product count is required',
              validate: (value) =>
                value > 0 || 'Product count cannot be less than 1',
            })}
            disabled={isUpdatingProduct}
            error={errors.count_in_stock?.message}
          />

          <CheckboxInput
            label="Featured product"
            defaultChecked={featured}
            onCheckedChange={(checked) =>
              setValue('featured', checked as boolean)
            }
            disabled={isUpdatingProduct}
            // checked={isProductFeatured}
          />
        </div>

        <ImageInput
          label="Product Image"
          type="file"
          id="product_image"
          defaultImage={product_image}
          {...register('product_image', {
            // required: 'Product Image is required',
          })}
          disabled={isUpdatingProduct}
          error={errors.product_image?.message}
        />

        {/* <Button disabled={!formChanged || isUpdatingProduct}>
          Update Product
        </Button> */}

        <Button
          className="w-full flex items-center gap-2"
          disabled={!formChanged || isUpdatingProduct}
        >
          {isUpdatingProduct && <div className="spinner"></div>}
          <span>Update Product</span>
        </Button>
      </form>
      {/* </Form> */}
    </>
  );
};

export default UpdateProductForm;
