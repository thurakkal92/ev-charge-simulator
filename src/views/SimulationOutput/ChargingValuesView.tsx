import { useSimulation } from '@/context/SimulationContext';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function ChargingValuesView() {
    const { results } = useSimulation();

    return (
        <div className="border bg-white border-neutral-200 shadow-sm rounded-md p-4 min-h-80">
            <div className="flex gap-2 mb-4">
                <h4 className="text-neutral-900 font-semibold">Charging Values (kW) per Chargepoint</h4>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    width={500}
                    height={400}
                    data={results.chargingValue}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorGradient-1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d0fae5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#d0fae5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="station" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="power"
                        stroke="#009966"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorGradient-1)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export { ChargingValuesView };
