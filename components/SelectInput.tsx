'use client';

import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  useState,
} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface SelectInputItem {
  id: string;
  name: string;
  value: string;
}

interface SelectInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  //   defautlValue?: SelectInputItem;
  defautlValue?: string;
  selectInputItems: SelectInputItem[];
  selectInputTriggerProps?: Omit<
    ComponentPropsWithoutRef<typeof SelectTrigger>,
    'disabled'
  >;
  selectInputContentProps?: ComponentPropsWithoutRef<typeof SelectContent>;
  onItemSelect: (value: string) => void;
  //   onItemSelect: (selectedItem: SelectInputItem) => void;
  selectInputItemProps?: Omit<
    ComponentPropsWithoutRef<typeof SelectItem>,
    'onSelect'
  >;
}

type SelectInputRef = ElementRef<typeof SelectTrigger>;

const SelectInput = React.forwardRef<SelectInputRef, SelectInputProps>(
  (
    {
      label,
      error,
      disabled,
      placeholder,
      selectInputItems,
      defautlValue,
      selectInputTriggerProps,
      selectInputContentProps,
      onItemSelect,
      selectInputItemProps,
    },
    ref
  ) => {
    //  FOR MANAGING TRIGGER STYLES
    const [selectInputValue, setSelectInputValue] = useState<
      undefined | string
    >(defautlValue);

    return (
      <>
        <Label htmlFor={selectInputTriggerProps?.id}>{label}</Label>
        <Select
          defaultValue={defautlValue}
          onValueChange={(value) => {
            console.log({ value });
            setSelectInputValue(value);
            onItemSelect(value);
          }}
        >
          <SelectTrigger
            className={cn(
              !selectInputValue && 'text-muted-foreground',
              error && 'border-destructive',
              selectInputTriggerProps?.className
            )}
            disabled={disabled}
            {...selectInputTriggerProps}
          >
            <SelectValue placeholder={placeholder || 'Select item'} />
          </SelectTrigger>

          <SelectContent {...selectInputContentProps}>
            {selectInputItems.map((item) => (
              <SelectItem
                textValue="Whatever"
                key={item.id}
                value={item.id}
                // className="capitalize"
                // onSelect={() => {
                //   console.log('selected item:', item);
                //   onItemSelect(item);
                // }}
                {...selectInputItemProps}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-destructive">{error}</span>
      </>
    );
  }
);

export default SelectInput;
