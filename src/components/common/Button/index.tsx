import React, { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    size?: 'md';
    variant?: 'default';
    children: React.ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const SIZE_CLASS = {
    md: 'py-3 px-4 text-base',
};

const VARIANT_CLASS = {
    default: 'bg-neutral-800 hover:bg-neutral-950  text-neutral-200 hover:text-neutral-50 font-semibold text-neu',
};

function Button(props: IProps) {
    const { children, startIcon, endIcon, onClick, size = 'md', variant = 'default', ...otherProps } = props;
    return (
        <button
            className={`${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} whitespace-nowrap text-white transition-all focus:outline-none rounded-md inline-flex items-center h-12`}
            onClick={onClick}
            {...otherProps}
        >
            <span>{startIcon}</span>
            <div className="pr-2" />
            {children}
            <div className="pr-2" />
            <span>{endIcon}</span>
        </button>
    );
}

export { Button };
