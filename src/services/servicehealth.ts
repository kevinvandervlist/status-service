module ServiceHealth {
    export interface ServiceHealth {
        ServiceName: string;
        Version: string;
        Hostname: string;
        Timestamp: string;
        Dependencies: [ServiceHealth];
    }
}
