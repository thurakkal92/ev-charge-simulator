'use client';

import * as React from 'react';
import { Slider } from '../../components/common/Slider';
import { Counter } from '../../components/common/Counter';
import { ToggleButton, ToggleButtonGroup } from '../../components/common/ToggleButton';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { useSimulation } from '@/context/SimulationContext';
import { useSimulationHandler } from '@/hooks/useSimulationHandler';

function SimulationSettings() {
    const { params, setParams, loading } = useSimulation();
    const { runSimulation } = useSimulationHandler();

    return (
        <div className="rounded-md bg-neutral-50 px-6 py-4 border-b static md:sticky top-0 z-20 border-neutral-200">
            <h2 className="text-2xl font-semibold">Simulation settings</h2>
            <div className="py-6 flex items-start flex-wrap gap-x-12 gap-y-10">
                <div>
                    <label className="text-neutral-600 text-base font-medium">Number of Charge Points</label>
                    <div className="pb-3" />
                    <div className="flex items-center h-10">
                        <Slider
                            onChange={(value) => setParams((prevState) => ({ ...prevState, chargePoints: value }))}
                            min={1}
                            defaultValue={params.chargePoints}
                            max={30}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-neutral-600 text-base">Arrival Probability Multiplier (%)</label>
                    <div className="pb-3" />
                    <div className="flex items-center h-10">
                        <Slider
                            variant="warning"
                            onChange={(value) => setParams((prevState) => ({ ...prevState, arrivalMultiplier: value }))}
                            min={20}
                            defaultValue={params.arrivalMultiplier}
                            max={200}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-neutral-600 text-base">Car energy consumption</label>
                    <div className="pb-3" />
                    <div className="flex items-center h-10">
                        <Counter
                            onChange={(newValue: number) =>
                                setParams((prevState) => ({ ...prevState, consumption: newValue }))
                            }
                            maxValue={100}
                            minValue={0}
                            onIncrement={() =>
                                setParams((prevState) => ({ ...prevState, consumption: prevState.consumption + 1 }))
                            }
                            onDecrement={() =>
                                setParams((prevState) => ({ ...prevState, consumption: prevState.consumption - 1 }))
                            }
                            value={params.consumption}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-neutral-600 text-base">Charging power per station</label>
                    <div className="pb-3" />
                    <div className="flex items-center h-10">
                        <ToggleButtonGroup
                            value={params.chargingPower}
                            onChange={(value) =>
                                typeof value === 'number'
                                    ? setParams(() => ({ ...params, chargingPower: value }))
                                    : () => {}
                            }
                        >
                            <ToggleButton value={11}>11KW</ToggleButton>
                            <ToggleButton value={22}>22KW</ToggleButton>
                            <ToggleButton value={33}>33KW</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
                <div className="flex flex-1 justify-end items-center self-end">
                    <Button onClick={runSimulation} startIcon={<Icon icon="sparkles" />}>
                        {loading ? 'Loading...' : 'Run simulation'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { SimulationSettings };
