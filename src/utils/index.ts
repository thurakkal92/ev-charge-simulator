export const generateChargingEvents = ({
    type,
    multiplier,
}: {
    type: 'day' | 'week' | 'month' | 'year';
    multiplier: number;
}) => {
    const count = type === 'day' ? 24 : type === 'week' ? 7 : type === 'month' ? 4 : 12;

    return Array.from({ length: count }, (_, index) => ({
        index: index + 1,
        count: Math.floor(generateRandomFactor(multiplier)),
    }));
};

export const generateRandomFactor = (multiplier: number) => {
    return Math.random() * multiplier;
};

export const generateExemplaryDay = (multiplier: number) => {
    return Array.from({ length: 24 }, (_, hour) => {
        const power = Math.floor(generateRandomFactor(multiplier));

        const sessions = Math.floor(generateRandomFactor(multiplier / 5)); // Sessions can be between 0 and 5 per hour

        return { hour, power, sessions };
    });
};
