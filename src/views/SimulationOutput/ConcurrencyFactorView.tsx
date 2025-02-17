import { Icon } from '@/components/common/Icon';
import { useSimulation } from '@/context/SimulationContext';
import * as React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid } from 'recharts';

function ConcurrencyFactorView() {
    const { results } = useSimulation();
    return (
        <div className="shadow-sm border border-neutral-200 rounded-md bg-white p-4 min-h-80">
            <div className="flex gap-2 mb-6">
                <h4 className="mb-6 text-neutral-900 font-semibold">Concurrency factor</h4>
                <Icon icon="trendUp" className="stroke-green-400" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results.concurrencyDeviation}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="chargepoints" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="deviation" fill="#155dfc" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export { ConcurrencyFactorView };
