export type Command = {
    name: string,
    run: string,
    dir?: string,
    environment?: Record<string, string>
}

export type Config = {
    commands: Command[]
}
