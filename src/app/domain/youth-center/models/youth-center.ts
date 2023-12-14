export interface YouthCenter {
    "id": number,
    "version": number,
    "arabicName": string,
    "englishName": string,
    "code": string,
    "enabled": boolean,
    "district": {
        "id": number,
        "version": number,
        "arabicName": string,
        "englishName": string,
        "code": string,
        "enabled": boolean
        "governorate": number
    }
}