import { District } from "../../district/models/district";

export interface YouthCenter {
    "id": number,
    "version": number,
    "arabicName": string,
    "englishName": string,
    "code": string,
    "enabled": boolean,
    "district": District
}