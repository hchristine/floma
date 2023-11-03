import { executeFile } from "./file-actions";

export async function start() {
    await executeFile("floma.yaml");
}

start();