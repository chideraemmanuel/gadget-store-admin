'use client';

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import BillboardNameInput from '@/components/formInputs/billboard/BillboardNameInput';
import BillboardImageInput from '@/components/formInputs/billboard/BillboardImageInput';
import BillboardHeadTextInput from '@/components/formInputs/billboard/BillboardHeadTextInput';
import BillboardParagraphInput from '@/components/formInputs/billboard/BillboardParagraphInput';
import {
  BillboardFormDataTypes,
  BillboardTypes,
  BillboardUpdateTypes,
} from '@/types';
import useUpdateBillboard from '@/lib/hooks/billboards/useUpdateBillboard';
import FormInput from '@/components/FormInput';
import TextareaInput from '@/components/TextareaInput';
import ImageInput from '@/components/ImageInput';

interface Props {
  billboard: BillboardTypes;
}

const UpdateBillboardForm: FC<Props> = ({ billboard }) => {
  const [formChanged, setFormChanged] = useState(false);

  const {
    mutate: updateBillboard,
    data: updatedBillboard,
    isLoading: isUpdatingBillboard,
    isError: isErrorUpdateingBillboard,
    isSuccess: isSuccessUpdateingBillboard,
  } = useUpdateBillboard();

  const form = useForm<BillboardFormDataTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = form;

  const watchedFormFields = watch();

  const trackFormChange = () => {
    // console.log('comparison', {
    //   name: `${watchedFormFields.name} - ${brand.name}`,
    // });
    // console.log('type comparison', {
    //   name: `${typeof watchedFormFields.name} - ${typeof brand.name}`,
    // });
    // console.log('comparison', {
    //   name: `${watchedFormFields.paragraph} - ${billboard.paragraph}`,
    // });

    if (
      watchedFormFields.name !== billboard.name ||
      watchedFormFields.head_text !== billboard.head_text ||
      // (billboard.paragraph &&
      //   watchedFormFields.paragraph !== billboard.paragraph)

      watchedFormFields.paragraph !== billboard.paragraph ||
      watchedFormFields.billboard_image
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
  //   const formChangeStatus = hasFormChanged();

  //   console.log('form change status', formChangeStatus);
  //   console.log('form changed state', formChanged);

  //   if (formChangeStatus) {
  //     setFormChanged(true);
  //     return;
  //   }

  //   setFormChanged(false);
  //   console.log('set to false');
  // }, [hasFormChanged]);

  const onSubmit: SubmitHandler<BillboardFormDataTypes> = async (data, e) => {
    // IN CASE USER USES ENTER KEY TO SUBMIT
    if (!formChanged) {
      return;
    }

    console.log('submitted data', data);

    const formValues = getValues();

    console.log('form values', formValues);

    // BUILD UPDATES
    const updates: BillboardUpdateTypes = {};

    if (formValues.name !== billboard.name) {
      updates.name = formValues.name;
    }

    if (formValues.head_text !== billboard.head_text) {
      updates.head_text = formValues.head_text;
    }

    if (formValues.paragraph !== billboard.paragraph) {
      updates.paragraph = formValues.paragraph;
    }

    if (formValues.billboard_image) {
      updates.billboard_image = formValues.billboard_image;
    }

    console.log('final update', updates);

    updateBillboard({
      billboardId: billboard._id,
      updates,
    });
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
        {/* <div className="flex gap-2"> */}
        <FormInput
          label="Billboard Name"
          defaultValue={billboard.name}
          placeholder="Enter billboard name"
          id="name"
          {...register('name', {
            required: 'Billboard name is required',
          })}
          disabled={isUpdatingBillboard}
          error={errors.name?.message}
        />

        {/* <FormInput
            label="Billboard Image"
            type="file"
            id="billboard_image"
            defaultValue={billboard.billboard_image}
            {...register('billboard_image', {
              required: 'Billboard Image is required',
            })}
            disabled={isUpdatingBillboard}
            error={errors.billboard_image?.message}
          /> */}
        {/* </div> */}

        <FormInput
          label="Billboard Head Text"
          defaultValue={billboard.head_text}
          placeholder="Enter billboard head text"
          id="head_text"
          {...register('head_text', {
            required: 'Head text is required',
          })}
          disabled={isUpdatingBillboard}
          error={errors.head_text?.message}
        />

        <TextareaInput
          label="Billboard paragraph"
          defaultValue={billboard.paragraph}
          placeholder="Enter billboard paragraph"
          id="paragraph"
          {...register('paragraph', {
            // required: 'Product paragraph is required',
          })}
          disabled={isUpdatingBillboard}
          error={errors.paragraph?.message}
        />

        <ImageInput
          label="Billboard Image"
          type="file"
          id="billboard_image"
          defaultImage={billboard.billboard_image}
          {...register('billboard_image', {
            required: 'Billboard Image is required',
          })}
          disabled={isUpdatingBillboard}
          error={errors.billboard_image?.message}
        />

        {/* <Button disabled={!formChanged || isUpdatingBillboard}>
            Update Billboard
          </Button> */}
        <Button
          className="w-full flex items-center gap-2"
          disabled={!formChanged || isUpdatingBillboard}
        >
          {isUpdatingBillboard && <div className="spinner"></div>}
          <span>Update Billboard</span>
        </Button>
      </form>
      {/* </Form> */}
    </>
  );
};

export default UpdateBillboardForm;
