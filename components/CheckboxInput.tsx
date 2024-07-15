import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

interface CheckboxInputProps extends ComponentPropsWithoutRef<typeof Checkbox> {
  label?: string;
  description?: string;
}

type CheckboxInputRef = ElementRef<typeof Checkbox>;

const CheckboxInput = React.forwardRef<CheckboxInputRef, CheckboxInputProps>(
  ({ label, description, id, ...props }, ref) => {
    return (
      <>
        {/* <div className="w-full flex flex-row items-start self-start space-x-3 space-y-0 rounded-md border p-4">
          <Label htmlFor={id}>{label}</Label>
          <Checkbox id={id} ref={ref} {...props} />
        </div> */}

        <span>{label}</span>
        {/* <div className="items-top flex space-x-2"> */}
        <div className="w-full flex flex-row items-start self-start space-x-3 space-y-0 rounded-md border p-4">
          <Checkbox id={id} ref={ref} {...props} />
          <Label
            htmlFor={id}
            className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {description}
          </Label>
        </div>
      </>
    );
  }
);

export default CheckboxInput;
