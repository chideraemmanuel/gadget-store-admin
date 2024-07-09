'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DevTool } from '@hookform/devtools';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BillboardNameInput from '@/components/formInputs/billboard/BillboardNameInput';
import BillboardImageInput from '@/components/formInputs/billboard/BillboardImageInput';
import BillboardHeadTextInput from '@/components/formInputs/billboard/BillboardHeadTextInput';
import BillboardParagraphInput from '@/components/formInputs/billboard/BillboardParagraphInput';
import useAddBillboard from '@/lib/hooks/billboards/useAddBillboard';
import FormInput from '@/components/FormInput';
import TextareaInput from '@/components/TextareaInput';
import ImageInput from '@/components/ImageInput';

interface Props {}

export interface BillboardFormDataTypes {
  name: string;
  head_text: string;
  paragraph?: string;
  billboard_image: FileList;
}

const AddBillboardForm: FC<Props> = () => {
  const {
    mutate: addBillboard,
    isLoading: isAddingBillboard,
    isError: isErrorAddingBillboard,
  } = useAddBillboard();

  const form = useForm<BillboardFormDataTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = form;

  const onSubmit: SubmitHandler<BillboardFormDataTypes> = async (data, e) => {
    console.log('submitted data', data);

    addBillboard(data);

    // addBillboard({
    //   ...data,
    //   billboard_image: data.billboard_image[0],
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
        {/* <div className="flex gap-2"> */}
        <FormInput
          label="Billboard Name"
          placeholder="Enter billboard name"
          id="name"
          {...register('name', {
            required: 'Billboard name is required',
          })}
          disabled={isAddingBillboard}
          error={errors.name?.message}
        />

        {/* <FormInput
            label="Billboard Image"
            type="file"
            id="billboard_image"
            {...register('billboard_image', {
              required: 'Billboard Image is required',
            })}
            disabled={isAddingBillboard}
            error={errors.billboard_image?.message}
          /> */}
        {/* </div> */}

        <FormInput
          label="Billboard Head Text"
          placeholder="Enter billboard head text"
          id="head_text"
          {...register('head_text', {
            required: 'Head text is required',
          })}
          disabled={isAddingBillboard}
          error={errors.head_text?.message}
        />

        <TextareaInput
          label="Billboard paragraph"
          placeholder="Enter billboard paragraph"
          id="paragraph"
          {...register('paragraph', {
            // required: 'Product paragraph is required',
          })}
          disabled={isAddingBillboard}
          error={errors.paragraph?.message}
        />

        <ImageInput
          label="Billboard Image"
          type="file"
          id="billboard_image"
          {...register('billboard_image', {
            required: 'Billboard Image is required',
          })}
          disabled={isAddingBillboard}
          error={errors.billboard_image?.message}
        />

        {/* <Button disabled={isAddingBillboard}>Add Billboard</Button> */}
        <Button
          className="w-full flex items-center gap-2"
          disabled={isAddingBillboard}
        >
          {isAddingBillboard && <div className="spinner"></div>}
          <span>Add Billboard</span>
        </Button>
      </form>
      {/* </Form> */}
    </>
  );
};

export default AddBillboardForm;
