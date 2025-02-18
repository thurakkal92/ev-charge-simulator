import { useSimulation } from '@/context/SimulationContext';
import { Result } from '@/types/simulation';
import { generateChargingEvents, generateExemplaryDay, generateRandomFactor } from '@/utils';

export function useSimulationHandler() {
    const { params, setResults, setLoading } = useSimulation();

    const runSimulation = () => {
        setLoading(true); //button loading state
        const chargingValue = Array.from({ length: params.chargePoints }, (_, i) => ({
            station: i + 1,
            power: Math.floor(generateRandomFactor(params.chargingPower - Math.random() * 3)),
        }));

        const exemplaryDay = generateExemplaryDay(params.arrivalMultiplier);

        const totalEnergy = Math.floor(generateRandomFactor(params.chargePoints * params.consumption * 200));

        const noOfChargingEvents: Result['noOfChargingEvents'] = [
            { type: 'day', events: generateChargingEvents({ type: 'day', multiplier: params.arrivalMultiplier }) },
            { type: 'week', events: generateChargingEvents({ type: 'week', multiplier: params.arrivalMultiplier }) },
            { type: 'month', events: generateChargingEvents({ type: 'month', multiplier: params.arrivalMultiplier }) },
            { type: 'year', events: generateChargingEvents({ type: 'year', multiplier: params.arrivalMultiplier }) },
        ];
        const concurrencyDeviation = runConcurrencyAnalysis();

        setResults({
            chargingValue,
            exemplaryDay,
            totalEnergy,
            noOfChargingEvents,
            concurrencyDeviation,
        });

        setTimeout(() => setLoading(false), 500);
    };

    const runConcurrencyAnalysis = () => {
        return Array.from({ length: params.chargePoints }, (_, i) => {
            const cp = i + 1;
            const concurrencyFactor = Math.random() * 100;
            return {
                chargepoints: cp,
                concurrencyFactor,
                deviation:
                    concurrencyFactor < 35
                        ? concurrencyFactor - 35
                        : concurrencyFactor > 55
                        ? concurrencyFactor - 55
                        : 0,
            };
        });
    };

    return { runSimulation, runConcurrencyAnalysis };
}
