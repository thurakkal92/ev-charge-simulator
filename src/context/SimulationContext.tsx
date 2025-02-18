'use client';

import { Result, SimulationContextType, SimulationState } from '@/types/simulation';
import { createContext, useContext, useState } from 'react';

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
    const [params, setParams] = useState<SimulationState>({
        chargePoints: 20,
        arrivalMultiplier: 100,
        consumption: 18,
        chargingPower: 11,
    });

    const [results, setResults] = useState<Result>({} as Result);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <SimulationContext.Provider value={{ params, setParams, results, setResults, loading, setLoading }}>
            {children}
        </SimulationContext.Provider>
    );
}

export function useSimulation() {
    const context = useContext(SimulationContext);
    if (!context) throw new Error('useCharging must be used within ChargingProvider');
    return context;
}
