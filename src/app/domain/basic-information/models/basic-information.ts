import { AffiliateClub } from "../../affiliate-club/models/affiliate-club"
import { AffiliateParty } from "../../affiliate-party/models/affiliate-party"
import { Azhar } from "../../azhar/models/azhar"
import { Club } from "../../club/models/club"
import { District } from "../../district/models/district"
import { EducationAdministration } from "../../eduction-administration/model/eduction-administration"
import { Government } from "../../government/models/government"
import { YouthCenter } from "../../youth-center/models/youth-center"

export interface BasicInformation {
    id: number,
    fullName: string,
    nationalId: string,
    birthDate: string,
    female: boolean,
    muslim: boolean,
    hasDisability: boolean,
    disabilityType: string,
    anotherClub: string | null,
    affiliateParty: AffiliateParty,
    affiliateClub: AffiliateClub | null,
    governorate: Government,
    district: District,
    request: Request,
    alAzhar: Azhar | null,
    club: Club | null,
    eductionAdministration: EducationAdministration | null,
    youthCentre: YouthCenter | null
}