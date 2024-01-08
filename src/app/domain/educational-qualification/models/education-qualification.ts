import { AcademicYear } from "../../academic-year/models/academic-year";
import { EducationalLevel } from "../../educational-level/models/educational-level";

export interface EducationQualification{
id:number;
academicYear:AcademicYear;
educationalLevel:EducationalLevel;
coursesName:string;
schoolName:string;
}
