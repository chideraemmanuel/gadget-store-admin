import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface CheckboxInputProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  label?: string;
}

type CheckboxInputRef = ElementRef<typeof Checkbox>;

const CheckboxInput = React.forwardRef<CheckboxInputRef, CheckboxInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <>
        <div className="flex flex-row items-start self-start space-x-3 space-y-0 rounded-md border p-4">
          <Label htmlFor="">{label}</Label>
          <Checkbox {...props} ref={ref} />
        </div>
      </>
    );
  }
);

export default CheckboxInput;
