import { AffiliateParty } from "../../affiliate-party/models/affiliate-party";
import { Government } from "../../government/models/government";

export interface User {
    id: number;
    version: number;
    email: string;
    phoneNumber: string | null;
    isActive: boolean;
    governorate: Government | null;
    affiliateParty: AffiliateParty | null;
    roles: string[] | null;
    otp: string | null;
  }