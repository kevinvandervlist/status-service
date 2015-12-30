export interface ServiceHealth {
    ServiceName :string;
    Version: string;
    State: string;
    Hostname: string;
    Timestamp: string;
    Dependencies: Array<string>;
}
