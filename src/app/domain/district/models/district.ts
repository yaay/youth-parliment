import { Government } from "../../government/models/government";

export interface District {
        "id": number,
        "version": number,
        "arabicName": string,
        "englishName": string,
        "code": string,
        "enabled": boolean,
        "governorate": Government
}