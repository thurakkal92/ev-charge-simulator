# The electric charge simulator - React | Next JS | Typescript | Tailwind

## Understand Energy Demand for EV Chargers

Shop owner has noticed an increasing number of EVs parking at his store and wants to install charging stations to attract more customers and support sustainability efforts.

## Getting Started

### How to run execute the task 1

```js
    npm run task1
```

### How to run the UI task 2a in local

```js
    npm run dev
```

### To generate the build

```js
    npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Code structure

The code is organized as follows:

```javascript

scripts/index.js - //Added the task 1 logic here.

1. app - // define routes based on the file and folder structure
2. components - // All the UI components (atoms)
3. context - // Context provider
4. hooks - // custom hooks added here for resuing logic.
5. views - // Views are added here and can independently used anywhere.
6. utils - // Holds all the util funtions.
7. types - // common types added here.

```

## Visualisation logic with input parameters

Input parameters and results are configured here. Simulation works based on this configuration.

```javascript

//SimulationContextProvider

export function SimulationProvider({ children }: { children: React.ReactNode }) {
    const [params, setParams] = useState<SimulationState>({
        chargePoints: 20,
        arrivalMultiplier: 100,
        consumption: 18,
        chargingPower: 11,
    });

    const [results, setResults] = useState<Result>({} as Result);

    return (
        <SimulationContext.Provider value={{ params, setParams, results, setResults }>
            {children}
        </SimulationContext.Provider>
    );
}

export function useSimulation() {
    const context = useContext(SimulationContext);
    if (!context) throw new Error('useCharging must be used within ChargingProvider');
    return context;
}
```

## Custom hook to runSimulation, runConcurrencyAnalysis (deviation) and update the results.

```javascript
//hooks

export function useSimulationHandler() {
    const { params, setResults } = useSimulation();

    const runSimulation = () => {
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
```

## Key insights visualization using Result data

```javascript
//views

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
```

## Rechart implementation for visualizing the simulated data

```javascript
<ResponsiveContainer width="100%" height={300}>
    <BarChart data={results.concurrencyDeviation}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="chargepoints" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="deviation" fill="#155dfc" />
    </BarChart>
</ResponsiveContainer>
```
