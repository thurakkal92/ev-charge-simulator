import React from 'react';
import { ToggleButtonGroupContext } from './context';

interface ToggleButtonGroupProps {
    value: string | number;
    onChange: (newValue: string | number) => void;
    exclusive?: boolean;
    children: React.ReactNode;
    ariaLabel?: string;
}

function ToggleButtonGroup({ value, onChange, children, ...otherProps }: ToggleButtonGroupProps) {
    const handleToggle = (newValue: string | number) => {
        onChange(newValue);
    };

    return (
        <ToggleButtonGroupContext.Provider value={{ value, onChange: handleToggle }}>
            <div
                style={{ gap: '1px' }}
                className="border border-neutral-200 rounded-md overflow-hidden bg-neutral-200 flex justify-center items-center"
                {...otherProps}
            >
                {children}
            </div>
        </ToggleButtonGroupContext.Provider>
    );
}

export default ToggleButtonGroup;
