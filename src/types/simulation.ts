interface SimulationState {
    chargePoints: number;
    arrivalMultiplier: number;
    consumption: number;
    chargingPower: number;
}

type ChargingValue = {
    station: number;
    power: number;
};

type ExemplaryDayItem = {
    hour: number;
    power: number;
    sessions: number;
};

type Event = {
    index: number;
    count: number;
};

type ChargingEvent = {
    type: 'day' | 'week' | 'month' | 'year';
    events: Event[];
};

type ConcurrencyAnalysisItem = {
    chargepoints: number;
    concurrencyFactor: number;
    deviation: number;
};

type Result = {
    chargingValue?: ChargingValue[];
    exemplaryDay?: ExemplaryDayItem[];
    totalEnergy?: number;
    noOfChargingEvents?: ChargingEvent[];
    concurrencyDeviation: ConcurrencyAnalysisItem[];
};

interface SimulationContextType {
    params: SimulationState;
    setParams: React.Dispatch<React.SetStateAction<SimulationState>>;
    results: Result;
    setResults: React.Dispatch<React.SetStateAction<Result>>;
}

export type { SimulationContextType, SimulationState, Result };
