import { EducationalLevel } from "../../educational-level/models/educational-level";

export interface AcademicYear {
  id:number;
  arabicName:string;
  englishName:string;
  code:string;
  enabled:boolean;
  educationalLevel:EducationalLevel;
}
