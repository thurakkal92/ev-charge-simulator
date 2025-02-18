'use client';

import * as React from 'react';
import { ChargingValuesView } from './ChargingValuesView';
import { CharginEventsView } from './ChargingEventsView';
import { ConcurrencyFactorView } from './ConcurrencyFactorView';
import { EmptyState } from '../EmptyState';
import { useSimulation } from '@/context/SimulationContext';
import { KeyInsightsView } from './KeyInsightsView';
import { ExemplaryDayView } from './ExemplaryDayView';

function SimilationOutput() {
    const { results, loading } = useSimulation();
    if (Object.keys(results).length === 0 || loading) return <EmptyState loading={loading} />;

    return (
        <>
            <h2 className="py-4 px-6 w-100p text-xl font-semibold">Visualization</h2>
            <div className="bg-neutral-100 mx-4 p-6">
                <KeyInsightsView />
                <div className="grid rounded-md grid-cols-1 sm:grid-cols-2 md-grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-6 flex-wrap flex-1">
                    <ChargingValuesView />
                    <CharginEventsView />
                    <ConcurrencyFactorView />
                    <ExemplaryDayView />
                </div>
            </div>
        </>
    );
}

export { SimilationOutput };
