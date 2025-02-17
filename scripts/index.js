
//Code to simulate ev charging station depends on given probabilities


const ARRIVAL_PROBABILITIES = [
    0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, 0.0094, // 00:00 - 07:00
    0.0283, 0.0283, 0.0566, 0.0566, 0.0566, 0.0755, 0.0755, 0.0755, // 08:00 - 15:00
    0.1038, 0.1038, 0.1038, 0.0472, 0.0472, 0.0472, 0.0094, 0.0094  // 16:00 - 23:00
];

const CHARGING_DEMANDS = [
    { km: 0, probability: 0.3431 },   // 0 km (no charge)
    { km: 5, probability: 0.0490 },   // 5 km
    { km: 10, probability: 0.0980 },  // 10 km
    { km: 20, probability: 0.1176 },  // 20 km
    { km: 30, probability: 0.0882 },  // 30 km
    { km: 50, probability: 0.1176 },  // 50 km
    { km: 100, probability: 0.1078 }, // 100 km
    { km: 200, probability: 0.0490 }, // 200 km
    { km: 300, probability: 0.0294 }  // 300 km
];

class EVChargingSimulation {

    constructor(numberOfChargepoints, chargingPowerPerStation, totalIntervals, kWhPer100km) {
        this.numberOfChargepoints = numberOfChargepoints;
        this.chargingPowerPerStation = chargingPowerPerStation;
        this.totalIntervals = totalIntervals;
        this.kWhPer100km = kWhPer100km;

        this.chargepoints = Array(this.numberOfChargepoints).fill({
            isBusy: false,
            remainingTime: 0,
            powerDemand: 0
        });

        this.totalEnergyConsumed = 0; // Total energy consumed (kWh)
        this.maxPowerDemand = 0;      // Actual maximum power demand (kW)
    }

    // Helper function to simulate EV arrival
    simulateArrival(hour) {
        return Math.random() < ARRIVAL_PROBABILITIES[ hour ];
    }

    // Helper function to simulate charging demand
    simulateChargingDemand() {
        const random = Math.random();
        let cumulativeProbability = 0;
        for (const demand of CHARGING_DEMANDS) {
            cumulativeProbability += demand.probability;
            if (random <= cumulativeProbability) {
                return demand.km;
            }
        }
        return 0;
    }

    // Function to simulate one interval
    simulateInterval(interval) {
        const hour = Math.floor(interval / 4) % 24; // interval to hour of the day
        let totalPowerDemand = 0;

        for (let i = 0; i < this.numberOfChargepoints; i++) {
            if (!this.chargepoints[ i ].isBusy) {
                if (this.simulateArrival(hour)) {
                    const km = this.simulateChargingDemand();
                    if (km > 0) {
                        const energy = (km * this.kWhPer100km) / 100;
                        const chargingTime = Math.ceil(energy / (this.chargingPowerPerStation * 0.25)); // 15-minute intervals
                        this.chargepoints[ i ] = {
                            isBusy: true,
                            remainingTime: chargingTime,
                            powerDemand: this.chargingPowerPerStation
                        };
                        this.totalEnergyConsumed += energy;
                    }
                }
            } else {
                this.chargepoints[ i ].remainingTime--;
                if (this.chargepoints[ i ].remainingTime <= 0) {
                    this.chargepoints[ i ] = { isBusy: false, remainingTime: 0, powerDemand: 0 };
                }
            }

            totalPowerDemand += this.chargepoints[ i ].powerDemand;
        }

        if (totalPowerDemand > this.maxPowerDemand) {
            this.maxPowerDemand = totalPowerDemand;
        }
    }

    // To run the simulation
    runSimulation() {
        for (let interval = 0; interval < this.totalIntervals; interval++) {
            this.simulateInterval(interval);
        }
    }

    // Function to calculate results
    calculateResults() {
        const theoreticalMaxPowerDemand = this.numberOfChargepoints * this.chargingPowerPerStation;
        const concurrencyFactor = (this.maxPowerDemand / theoreticalMaxPowerDemand) * 100;

        return {
            totalEnergyConsumed: this.totalEnergyConsumed.toFixed(2),
            theoreticalMaxPowerDemand,
            actualMaxPowerDemand: this.maxPowerDemand,
            concurrencyFactor: concurrencyFactor.toFixed(2)
        };
    }
}

// Function for analyzing the concurrency factor for 1 to 30 chargepoints
function analyzeConcurrencyFactor() {
    const results = [];

    for (let chargepoints = 1; chargepoints <= 30; chargepoints++) {
        const simulation = new EVChargingSimulation(chargepoints, 11, 35040, 18);
        simulation.runSimulation();
        const result = simulation.calculateResults();
        results.push({
            chargepoints,
            ...result
        });
    }

    return results;
}

const concurrencyResults = analyzeConcurrencyFactor();


//To see the results run `npm run task1`
console.table(concurrencyResults)