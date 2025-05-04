import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export interface NumberInputProps
  extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  onValueChange?: (value: number | undefined) => void;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      stepper,
      thousandSeparator,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      ...props
    },
    ref,
  ) => {
    // Only use internal state when component is uncontrolled
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<number>(
      defaultValue ?? 0,
    );

    // Use the appropriate value source
    const value = isControlled ? controlledValue : internalValue;

    const handleIncrement = useCallback(() => {
      const newValue = Math.min(value + (stepper ?? 1), max);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    }, [value, stepper, max, isControlled, onValueChange]);

    const handleDecrement = useCallback(() => {
      const newValue = Math.max(value - (stepper ?? 1), min);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    }, [value, stepper, min, isControlled, onValueChange]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!ref) return;

        if (
          document.activeElement ===
          (ref as React.RefObject<HTMLInputElement>).current
        ) {
          if (e.key === 'ArrowUp') {
            handleIncrement();
          } else if (e.key === 'ArrowDown') {
            handleDecrement();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleIncrement, handleDecrement, ref]);

    // Initialize from controlled value if provided
    useEffect(() => {
      if (!isControlled) return;

      // Only initialize the internal value on first render or value type change
      setInternalValue(controlledValue);
    }, [isControlled]);

    const handleChange = (values: {
      value: string;
      floatValue: number | undefined;
    }) => {
      const newValue = values.floatValue ?? 0;

      if (!isControlled) {
        setInternalValue(Number(newValue));
      }

      if (onValueChange) {
        onValueChange(Number(newValue));
      }
    };

    const handleBlur = () => {
      let newValue = value;

      if (value < min) {
        newValue = min;
      } else if (value > max) {
        newValue = max;
      }

      if (newValue !== value) {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        if (onValueChange) {
          onValueChange(newValue);
        }
      }
    };

    return (
      <div className="flex items-center">
        <NumericFormat
          value={value}
          onValueChange={handleChange}
          thousandSeparator={thousandSeparator}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          allowNegative={min < 0}
          valueIsNumericString
          onBlur={handleBlur}
          max={max}
          min={min}
          suffix={suffix}
          prefix={prefix}
          customInput={Input}
          placeholder={placeholder}
          className="relative [appearance:textfield] rounded-r-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          getInputRef={ref}
          {...props}
        />

        <div className="flex">
          <Button
            aria-label="Decrease value"
            className="border-input h-9 rounded-none border-b-[0.5px] border-l-0 px-2 focus-visible:relative"
            variant="outline"
            onClick={handleDecrement}
            disabled={value === min}
            type="button"
          >
            <ChevronLeft size={15} />
          </Button>
          <Button
            aria-label="Increase value"
            className="border-input h-9 rounded-l-none border-t-[0.5px] border-l-0 px-2 focus-visible:relative"
            variant="outline"
            onClick={handleIncrement}
            disabled={value === max}
            type="button"
          >
            <ChevronRight size={15} />
          </Button>
        </div>
      </div>
    );
  },
);
