import * as React from 'react';
import Image from 'next/image';

function EmptyState() {
    return (
        <div className="h-100p w-100p py-6 flex flex-col justify-center items-center">
            <Image width={500} height={400} alt="empty-state" src="/empty-state.jpeg" />
            <h3 className="text-base font-semibold py-4 text-neutral-800">Run simulation to view the results here</h3>
        </div>
    );
}

export { EmptyState };
