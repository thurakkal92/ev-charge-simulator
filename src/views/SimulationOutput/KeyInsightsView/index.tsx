import * as React from 'react';
import { KeyInsightCard } from './KeyInsightCard';
import { useSimulation } from '@/context/SimulationContext';

function KeyInsightsView() {
    const { results } = useSimulation();
    return (
        <div className="grid grid-cols-4 gap-x-6 pb-6">
            <KeyInsightCard
                variant="success"
                label="Total Energy Charged"
                value={results.totalEnergy || 0}
                helperText="kWh"
            />
            <KeyInsightCard variant="error" label="Peak Power Demand" value={23456} helperText="kW" />
            <KeyInsightCard variant="warning" label="Concurrency Factor" value={45} helperText="%" />
            <KeyInsightCard variant="info" label="Total Charging Events" value={2500} />
        </div>
    );
}

export { KeyInsightsView };
