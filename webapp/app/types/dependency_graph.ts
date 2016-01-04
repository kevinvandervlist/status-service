import {ServiceHealth} from "./service_health";
import {Edge} from "./edge";

export interface DependencyGraph {
    nodes: Array<ServiceHealth>;
    edges: Array<Edge>;
}