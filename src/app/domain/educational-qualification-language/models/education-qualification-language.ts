import { Language } from "../../education-language/models/language";
import { LanguageLevel } from "../../language-level/models/language-level";

export interface EducationQualificationLanguage{
  id:number;
  language:Language;
  languageLevel:LanguageLevel;
}
