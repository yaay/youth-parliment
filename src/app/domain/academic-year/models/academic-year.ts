export interface AcademicYear {
  id:number;
  version:number;
  arabicName:string;
  englishName:string;
  code:string;
  enabled:boolean;
  educationalLevel:{
    id:number;
  }
}
