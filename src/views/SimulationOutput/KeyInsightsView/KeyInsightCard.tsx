import { Icon } from '@/components/common/Icon';
import * as React from 'react';

interface IProps {
    variant: 'success' | 'warning' | 'error' | 'info';
    label: string;
    value: number;
    helperText?: string;
}

// const VARIANT_CLASS = {
//     warning: 'text-yellow-500 bg-yellow-500 ',
//     success: '',
//     error: '',
//     info: '',
// };
const VARIANT_CLASS = {
    warning: 'bg-yellow-400 border-yellow-200 stroke-yellow-700',
    success: 'bg-green-400 border-green-200 stroke-green-700',
    error: 'bg-red-400 border-red-200 stroke-red-800',
    info: 'bg-blue-400 border-blue-200 stroke-blue-900',
};

function KeyInsightCard(props: IProps) {
    const { variant, label, value, helperText } = props;
    return (
        <div className="border border-neutral-100 shadow-md flex-col flex p-6 rounded-md bg-white">
            <div className={`${VARIANT_CLASS[variant]} rounded-full border-4 flex items-center justify-center w-9 h-9`}>
                <Icon icon="trendUp" className="h-5 w-5 stroke-inherit" />
            </div>
            <span className="font-medium text-sm text-neutral-600 pt-6">{label}</span>
            <div className="pt-1 font-bold text-3xl text-neutral-900">
                {value}
                {helperText && <span className="pl-1 font-semibold text-neutral-300">{helperText}</span>}
            </div>
        </div>
    );
}

export { KeyInsightCard };
