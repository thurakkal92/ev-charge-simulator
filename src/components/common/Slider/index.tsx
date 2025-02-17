'use client';

import { useState, useRef, useCallback } from 'react';

interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    variant?: 'default' | 'warning';
}

function Slider(props: SliderProps) {
    const { min = 1, max = 30, step = 1, defaultValue = 1, onChange, variant = 'default' } = props;
    const [value, setValue] = useState(defaultValue);
    const sliderRef = useRef<HTMLDivElement>(null);

    const valueToPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    const percentageToValue = (percentage: number) => {
        const rawValue = min + (percentage / 100) * (max - min);
        return Math.round(rawValue / step) * step;
    };

    const handleChange = useCallback(
        (newValue: number) => {
            const clampedValue = Math.min(Math.max(newValue, min), max);
            setValue(clampedValue);
            if (onChange) onChange(clampedValue);
        },
        [min, max, onChange]
    );

    const handleMove = useCallback(
        (clientX: number) => {
            if (!sliderRef.current) return;
            const rect = sliderRef.current.getBoundingClientRect();
            const percentage = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 0), 100);
            handleChange(percentageToValue(percentage));
        },
        [handleChange]
    );

    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        handleMove(clientX);

        const handlePointerMove = (event: MouseEvent | TouchEvent) => {
            const moveX = 'touches' in event ? event.touches[0].clientX : event.clientX;
            handleMove(moveX);
        };

        const handlePointerUp = () => {
            document.removeEventListener('mousemove', handlePointerMove);
            document.removeEventListener('mouseup', handlePointerUp);
            document.removeEventListener('touchmove', handlePointerMove);
            document.removeEventListener('touchend', handlePointerUp);
        };

        document.addEventListener('mousemove', handlePointerMove);
        document.addEventListener('mouseup', handlePointerUp);
        document.addEventListener('touchmove', handlePointerMove);
        document.addEventListener('touchend', handlePointerUp);
    };

    const percentage = valueToPercentage(value);

    const VARIANT_CLASS = {
        default: 'bg-green-600',
        warning: 'bg-yellow-500',
    };

    return (
        <div className="relative w-full max-w-lg flex flex-col items-center">
            <div
                ref={sliderRef}
                className="relative w-full h-4 flex items-center cursor-pointer"
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
            >
                <div className="w-full h-2 bg-neutral-200 rounded-full relative">
                    <div
                        className={`${VARIANT_CLASS[variant]} absolute h-2  rounded-full`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>

                {/* Thumb */}
                <div
                    className="absolute w-12 border  text-base border-neutral-100 h-10 bg-white rounded-md shadow-md cursor-pointer flex items-center justify-center"
                    style={{ left: `calc(${percentage}% - 12px)` }}
                    role="slider"
                    aria-valuenow={value}
                    tabIndex={0}
                >
                    <span className="font-semibold dark:text-neutral-900" aria-hidden="true">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
}

export { Slider };
