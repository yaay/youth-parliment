import { RequestStatus } from "./request-status";
import { User } from "./user";

export interface request {
    id: number,
    requestStatus: RequestStatus | null,
    user: User | null
}