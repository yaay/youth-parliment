import { Government } from 'src/app/domain/government/models/government';

export interface Azhar {
    "id": number,
    "version": number,
    "createdBy": string,
    "updatedBy": string,
    "createdDate": string,
    "updatedDate": string,
    "arabicName": string,
    "englishName": string,
    "code": string,
    "enabled": boolean,
    "governorate": Government
}