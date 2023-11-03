import fs from 'fs/promises';
import { parse } from 'yaml';
import { Config } from './types';
import { executeCommand } from './processes';
import { pickColorByRoundRobin } from './utils';

export async function readFromFile(name: string): Promise<Config> {
    const content = await fs.readFile(name, 'utf-8');

    return parse(content);;
}

export async function executeFile(name: string) {
    const data = await readFromFile(name);

    const promises: Promise<void>[] = [];

    for (let i = 0; i < data.commands.length; i++) {
        const runningProcess = data.commands[i];

        const logColor = pickColorByRoundRobin(i);

        const proc = executeCommand(runningProcess, logColor);

        promises.push(proc);
    }

    await Promise.all(promises);

    process.exit();
}
