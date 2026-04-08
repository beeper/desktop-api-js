declare module '@beeper/desktop-api' {
  export default class BeeperDesktop {
    constructor(options: { accessToken: string; baseURL: string });

    messages: any;
    accounts: any;
    chats: any;

    get<T = unknown>(path: string, options?: unknown): any;
    put(path: string, options?: unknown): Promise<unknown>;
    post(path: string, options?: unknown): Promise<unknown>;
    delete(path: string, options?: unknown): Promise<unknown>;
  }
}
