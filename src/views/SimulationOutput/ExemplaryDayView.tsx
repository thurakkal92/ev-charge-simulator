import { Icon } from '@/components/common/Icon';
import { useSimulation } from '@/context/SimulationContext';
import * as React from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, Legend, CartesianGrid } from 'recharts';

function ExemplaryDayView() {
    const { results } = useSimulation();

    console.log(results.exemplaryDay, 'exemplaryDay');
    return (
        <div className="shadow-sm border border-neutral-200 rounded-md bg-white p-4 min-h-80">
            <div className="flex gap-2 mb-6">
                <h4 className="mb-6 text-neutral-900 font-semibold">Exemplary day</h4>
                <Icon icon="trendUp" className="stroke-green-400" />
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={results.exemplaryDay}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorGradient-2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dff2fe" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#dff2fe" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorGradient-3" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fefce8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#fefce8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="hour" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend />
                    <YAxis />
                    <Tooltip />
                    <Area
                        dataKey="power"
                        type="monotone"
                        stroke="#fe9a00"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorGradient-3)"
                    />
                    <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke="#007595"
                        strokeWidth={1}
                        fillOpacity={1}
                        fill="url(#colorGradient-2)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export { ExemplaryDayView };
