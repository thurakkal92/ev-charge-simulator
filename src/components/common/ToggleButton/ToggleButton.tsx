import React, { useContext } from 'react';
import { ToggleButtonGroupContext } from './context';

interface ToggleButtonProps {
    value: string | number;
    disabled?: boolean;
    children: React.ReactNode;
}

function ToggleButton({ value, disabled = false, children, ...otherProps }: ToggleButtonProps) {
    const context = useContext(ToggleButtonGroupContext);

    if (!context) {
        throw new Error('ToggleButton must be used within a ToggleButtonGroup');
    }

    const { value: selectedValue, onChange } = context;

    const selected = value === selectedValue;

    return (
        <button
            className={`px-4 py-2 flex text-sm font-semibold items-center justify-center border-none transition-all 
        ${
            selected
                ? ' bg-green-700 text-white hover:bg-green-800 hover:text-white'
                : 'text-neutral-700 bg-white hover:bg-neutral-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !disabled && onChange(value)}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
}

export { ToggleButton };
