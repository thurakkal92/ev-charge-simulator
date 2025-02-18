import { ToggleButton, ToggleButtonGroup } from '@/components/common/ToggleButton';
import { useSimulation } from '@/context/SimulationContext';
import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Event = { index: number; count: number };
type Type = 'day' | 'week' | 'month' | 'year';

function CharginEventsView() {
    const {
        results: { noOfChargingEvents },
    } = useSimulation();
    const [filter, setFilter] = useState('day');
    const [filteredData, setFilteredData] = useState(noOfChargingEvents?.find((d) => d.type === filter)?.events || []);

    const getEventsByType = (type: Type): Event[] => {
        const filteredData = noOfChargingEvents?.find((entry) => entry.type === type);
        return filteredData ? filteredData.events : [];
    };

    const filterHandler = React.useCallback(
        (newValue: string | number) => {
            const type = newValue as Type;
            setFilter(type);
            const data = getEventsByType(type);
            setFilteredData(data);
        },
        [filter, filteredData]
    );

    return (
        <div className="shadow-sm border border-neutral-200 rounded-md bg-white p-4 min-h-80 ">
            <div className="flex gap-2 mb-4 justify-between flex-wrap items-start">
                <h4 className="text-neutral-900 font-semibold">Number of Charging events</h4>

                <ToggleButtonGroup value={filter} onChange={filterHandler}>
                    <ToggleButton value="year">Year</ToggleButton>
                    <ToggleButton value="month">Month</ToggleButton>
                    <ToggleButton value="week">Week</ToggleButton>
                    <ToggleButton value="day">Day</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    width={500}
                    height={400}
                    data={filteredData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffc9c9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ffc9c9" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="index" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        strokeWidth={2}
                        type="monotone"
                        dataKey="count"
                        stroke="#fb2c36"
                        fillOpacity={1}
                        fill="url(#colorGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export { CharginEventsView };
