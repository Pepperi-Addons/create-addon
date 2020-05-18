export default interface Client {
    BaseURL: string;
    OAuthAccessToken: string;
    Module: any;
    addLogEntry: any;
}