import { Tiger } from "../../deps.ts";

export enum Constants {
    GATEWAY = "wss://gateway.discord.gg/?v=9&encoding=json",
    API = "https://discord.com/api"
}


export const Logger = new Tiger();

export const Heartbeat = {
    op: 1,
    d: null
}

export const Identify = {
    op: 2,
    d: {
        token: "null",
        intents: 513,
        properties: {
            $os: "linux",
            $browser: "dinord",
            $device: "dinord"
        }
    }
}