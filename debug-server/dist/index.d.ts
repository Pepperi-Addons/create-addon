import express from 'express';
export interface Client {
    AddonUUID: string;
    BaseURL: string;
    AssetsBaseUrl: string;
    OAuthAccessToken: string;
    Retry: (delay: number) => void;
    CodeRevisionURL?: string;
    EncryptedAddonUUID?: string;
    ExecutionUUID?: string;
    NumberOfTry?: number;
    Module?: any;
}
export interface Request {
    method: string;
    body: any;
    query: any;
    originalUrl?: string;
    path?: string;
}
interface DebugServerOptions {
    port?: number;
    addonUUID?: string;
    apiDirectory?: string;
}
export declare class DebugServer {
    app: express.Application;
    port: number;
    addonUUID: string;
    apiDirectory: string;
    assetsDirectory: string;
    constructor(options: DebugServerOptions);
    start(): void;
    addStaticFolder(virtualPath: string, path: string): void;
    createClient(req: express.Request): Client;
    createRequest(req: express.Request): Request;
    handler(req: express.Request, res: express.Response): Promise<void>;
}
export {};
