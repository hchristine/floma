import { SpawnOptionsWithoutStdio, spawn } from "child_process";
import { Command } from "./types";
import chalk from "chalk";

export async function executeCommand(cmd: Command, logColor: string): Promise<void> {
    const options: SpawnOptionsWithoutStdio = {
        shell: true,
        env: { ...process.env }
    };

    if (cmd.dir) {
        options.cwd = cmd.dir
    }

    if (cmd.environment) {
        const keys = Object.keys(cmd.environment);
        keys.forEach((key) => {
            options.env![key] = cmd.environment![key];
        });
    }

    const proc = spawn(cmd.run, options);

    proc.stdout.on('data', (data) => {
        // @ts-ignore
        const fn = chalk[logColor];

        const logTag = fn(`[${cmd.name}]: `);
        console.log(logTag, data.toString());
    });

    proc.stderr.on('data', (data) => {
        // @ts-ignore
        const fn = chalk[logColor];

        const logTag = fn(`[${cmd.name}]: `);
        console.log(logTag, data.toString());
    });

    return new Promise((resolve) => {
        proc.on('exit', () => {
            resolve();
        });
    });
}