import * as React from 'react';
import Image from 'next/image';

function EmptyState({ loading = false }: { loading?: boolean }) {
    return (
        <div className="h-100p w-100p py-6 flex flex-col justify-center items-center">
            <Image width={500} height={400} alt="empty-state" src="/empty-state.jpeg" />
            <div className="text-base font-semibold py-4 text-neutral-800 text-center px-4">
                {loading ? 'Loading your simulation....' : 'Run simulation to view the results here'}
            </div>
        </div>
    );
}

export { EmptyState };
