import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DevTool } from '@hookform/devtools';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddCategory } from '@/lib/hooks/useCategory';
import BrandNameInput from '@/components/formInputs/brand/BrandNameInput';
import BrandLogoInput from '@/components/formInputs/brand/BrandLogoInput';
import { useAddBrand } from '@/lib/hooks/useBrands';
import { useAddBillboard } from '@/lib/hooks/useBillboard';
import BillboardNameInput from '@/components/formInputs/billboard/BillboardNameInput';
import BillboardImageInput from '@/components/formInputs/billboard/BillboardImageInput';
import BillboardHeadTextInput from '@/components/formInputs/billboard/BillboardHeadTextInput';
import BillboardParagraphInput from '@/components/formInputs/billboard/BillboardParagraphInput';

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
    // TODO: finish this function
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
                disabled={isAddingBillboard}
              />
            </div>

            <div className="w-full">
              <BillboardImageInput
                register={register}
                errors={errors}
                disabled={isAddingBillboard}
              />
            </div>
          </div>

          <div>
            <BillboardHeadTextInput
              register={register}
              errors={errors}
              disabled={isAddingBillboard}
            />
          </div>

          <div>
            <BillboardParagraphInput
              register={register}
              errors={errors}
              disabled={isAddingBillboard}
            />
          </div>

          <Button disabled={isAddingBillboard}>Add Billboard</Button>
        </form>
      </Form>
    </>
  );
};

export default AddBillboardForm;
