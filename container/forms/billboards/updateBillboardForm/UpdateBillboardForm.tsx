'use client';

import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import { BillboardFormDataTypes } from '../addBillboardForm/AddBillboardForm';
import BillboardNameInput from '@/components/formInputs/billboard/BillboardNameInput';
import BillboardImageInput from '@/components/formInputs/billboard/BillboardImageInput';
import BillboardHeadTextInput from '@/components/formInputs/billboard/BillboardHeadTextInput';
import BillboardParagraphInput from '@/components/formInputs/billboard/BillboardParagraphInput';
import { BillboardTypes, BillboardUpdateTypes } from '@/types';
import useUpdateBillboardOnClient from '@/lib/hooks/billboards/useUpdateBillboardOnClient';

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
  } = useUpdateBillboardOnClient();

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

  const hasFormChanged = () => {
    // console.log('comparison', {
    //   name: `${watchedFormFields.name} - ${brand.name}`,
    // });
    // console.log('type comparison', {
    //   name: `${typeof watchedFormFields.name} - ${typeof brand.name}`,
    // });
    console.log('comparison', {
      name: `${watchedFormFields.paragraph} - ${billboard.paragraph}`,
    });

    if (
      watchedFormFields.name !== billboard.name ||
      watchedFormFields.head_text !== billboard.head_text ||
      // (billboard.paragraph &&
      //   watchedFormFields.paragraph !== billboard.paragraph)

      watchedFormFields.paragraph !== billboard.paragraph
    ) {
      console.log('form changed');

      return true;
    }

    console.log('form not changed');
    return false;
  };

  useEffect(() => {
    // console.log('useeffect rann!');
    const formChangeStatus = hasFormChanged();

    console.log('form change status', formChangeStatus);
    console.log('form changed state', formChanged);

    if (formChangeStatus) {
      setFormChanged(true);
      return;
    }

    setFormChanged(false);
    console.log('set to false');
  }, [hasFormChanged]);

  const onSubmit: SubmitHandler<BillboardFormDataTypes> = async (data, e) => {
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

    console.log('final update', updates);

    updateBillboard({
      billboardId: billboard._id,
      updates,
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
          encType="multipart/form-data"
          method="POST"
        >
          <DevTool control={control} />
          <div className="flex gap-2">
            <div className="w-full">
              <BillboardNameInput
                register={register}
                errors={errors}
                disabled={isUpdatingBillboard}
                defaultValue={billboard.name}
              />
            </div>

            <div className="w-full">
              <BillboardImageInput
                register={register}
                errors={errors}
                disabled={isUpdatingBillboard}
              />
            </div>
          </div>

          <div>
            <BillboardHeadTextInput
              register={register}
              errors={errors}
              disabled={isUpdatingBillboard}
              defaultValue={billboard.head_text}
            />
          </div>

          <div>
            <BillboardParagraphInput
              register={register}
              errors={errors}
              disabled={isUpdatingBillboard}
              defaultValue={billboard.paragraph}
            />
          </div>

          <Button disabled={!formChanged || isUpdatingBillboard}>
            Update Billboard
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateBillboardForm;
