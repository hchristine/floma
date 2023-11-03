export const pickColorByRoundRobin = (index: number): string => {
    const commandColors = ['blue', 'green', 'yellow'];
    if (index < commandColors.length - 1) commandColors[index];

    let i = index;

    while (commandColors.length <= i) {
        i = i % commandColors.length;
    }

    return commandColors[i];
}
