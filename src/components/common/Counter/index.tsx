'use client';

import * as React from 'react';

interface CounterProps {
    /**
     * Max value given to the counter. Right handle will get disable if value > maxValue
     */
    maxValue: number;
    /**
     * Min value given to the counter. Left handle will get disable if value < minValue
     */
    minValue: number;
    /**
     * Value of the counter
     */
    value: number;
    /**
     * Callback fired on increment
     */
    onIncrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Callback fired on decrement
     */
    onDecrement: (event: React.MouseEvent<HTMLButtonElement>) => void;

    /**
     * Helper text/ Hint text given to the counter
     */
    helperText?: string;
    /**
     * To handle input changes
     */
    onChange: (newValue: number) => void;
}

function Counter(props: CounterProps) {
    const { maxValue, minValue, onChange, onDecrement, onIncrement, helperText, value } = props;

    function handeIncrementClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (value >= maxValue) return;
        onIncrement(event);
    }
    function handeDecrementClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (value <= minValue) return;
        console.log('asdasdas');
        onDecrement(event);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = parseInt(event.target.value, 10);

        if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
            onChange(newValue);
        }
    }

    return (
        <div className="overflow-hidden border border-neutral-200 rounded-md flex items-center justify-center gap-0">
            <button
                className="transition-colors appearance-none px-4 py-3 text-2xl flex items-center justify-center hover:bg-neutral-200 h-10 w-10"
                onClick={handeDecrementClick}
            >
                -
            </button>
            <input
                type="number"
                className="border-l border-r border-neutral-200 h-10 px-4 w-16 font-medium text-lg text-center outline-none appearance-none
                [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                [&::-moz-inner-spin-button]:appearance-none [&::-moz-outer-spin-button]:appearance-none"
                value={value}
                onChange={handleInputChange}
                min={minValue}
                max={maxValue}
            />
            <button
                className="transition-colors appearance-none px-4 py-3 text-2xl flex items-center justify-center hover:bg-neutral-200 h-10 w-10"
                onClick={handeIncrementClick}
            >
                +
            </button>
            <div>{helperText}</div>
        </div>
    );
}

export { Counter };
