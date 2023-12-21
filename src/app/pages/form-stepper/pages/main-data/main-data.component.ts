import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { GovernmentRepository } from 'src/app/domain/government/government.repository';
import { minWordsValidator } from 'src/app/shared/Validators/minWords.validator';
import { TuiDay, TuiValidationError } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { BirthDateFromNationalIdPipe } from 'src/app/shared/pipes/birth-date-from-national-id.pipe';
import { GenderFromNationalIdPipe } from 'src/app/shared/pipes/gender-from-national-id.pipe';
import { StepperStateService } from 'src/app/core/services/stepper-state.service';
import { Government } from 'src/app/domain/government/models/government';
import { DistrictRepository } from 'src/app/domain/district/district.repository';
import { District } from 'src/app/domain/district/models/district';
import { AffiliatePartyRepository } from 'src/app/domain/affiliate-party/affiliate-party.repository';
import { AffiliateParty } from 'src/app/domain/affiliate-party/models/affiliate-party';
import { EducationAdministrationRepository } from 'src/app/domain/eduction-administration/education-administration.repository';
import { EducationAdministration } from 'src/app/domain/eduction-administration/model/eduction-administration';
import { AzharRepository } from 'src/app/domain/azhar/azhar.repository';
import { ClubRepository } from 'src/app/domain/club/club.repository';
import { Azhar } from 'src/app/domain/azhar/models/azhar';
import { Club } from 'src/app/domain/club/models/club';
import { AffiliateClub } from 'src/app/domain/affiliate-club/models/affiliate-club';
import { YouthCenter } from 'src/app/domain/youth-center/models/youth-center';
import { AffiliateClubRepository } from 'src/app/domain/affiliate-club/affiliate-club.repository';
import { YouthCenterRepository } from 'src/app/domain/youth-center/youth-center.repository';
import { RequestStatusRepository } from 'src/app/domain/request-status/request-status.repository';
import { ageRange } from 'src/app/shared/Validators/age-range.validator';
import {MaskitoOptions} from '@maskito/core';
import { RequestBasicInformationRepository } from 'src/app/domain/basic-information/request-basic-information.repository';
import { BasicInformationRepository } from 'src/app/domain/basic-information/basic-information.repository';


@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `هذه الخانة مطلوبه`,
        minWords: 'يرجي أدخال الاسم رباعي',
        ageRange: 'يجب أن يكون العمر 18-45',
      }
    }
  ]
})
export class MainDataComponent {
  arabicError = new TuiValidationError('يرجي ادخال الاسم باللغة العربية');
  nationalIdError = new TuiValidationError('أدخل رقم قومي صحيح');

  constructor(
    private govermentRepository: GovernmentRepository,
    private router: Router,
    private stepperStateService: StepperStateService,
    private districtRepository: DistrictRepository,
    private affiliatePartyRepository: AffiliatePartyRepository,
    private eduAdminRepository: EducationAdministrationRepository,
    private azharRepository: AzharRepository,
    private clubRepository: ClubRepository,
    private affiliateClubRepository: AffiliateClubRepository,
    private youthCenterRepository: YouthCenterRepository,
    private requestStatusRepository: RequestStatusRepository,
    private requestBasicInformationRepository: RequestBasicInformationRepository,
    private basicInformationRepository: BasicInformationRepository,
  ) { }

  readonly maskOptions: MaskitoOptions = {
    mask: [
      /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
    ],
  };

  disabilities: {arabicName: string, englishName: string}[] = [
    {arabicName: "سمعية", englishName: "HEARING"}, 
    {arabicName: "بصرية", englishName: "VISUAL"}, 
    {arabicName: "حركية", englishName: "MOVEMENT"}
  ];
  newUser: boolean = false;
  requestId!: number;
  formId!: number;
  selectedDisability!: string | undefined;
  selectedParty: number = 1;
  affiliateClub: string = '';
  govs: Government[] = [];
  districts: District[] = [];
  affiliateParties: AffiliateParty[] = [];
  eduAdmins: EducationAdministration[] = [];
  azharAdmins: Azhar[] = [];
  clubs: Club[] = [];
  affiliateClubs: AffiliateClub[] = [];
  youthCenters: YouthCenter[] = [];

  basicInfoForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, minWordsValidator(4),Validators.pattern(/^[\u0621-\u064A\040]+$/)]),
    nationalId: new FormControl(null, [Validators.required, ageRange(), Validators.pattern(/([2-3]{1})([0-9]{2})(0[1-9]|1[012])(0[1-9]|[1-2][0-9]|3[0-1])(0[1-4]|[1-2][1-9]|3[1-5]|88)[0-9]{3}([0-9]{1})[0-9]{1}/)]),
    governorate: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    affiliateParty: new FormControl(null, [Validators.required]),
    eductionAdministration: new FormControl(null),
    alAzhar: new FormControl(null),
    club: new FormControl(null),
    affiliateClub: new FormControl(null),
    youthCentre: new FormControl(null),
    dob: new FormControl(new TuiDay(2007, 0, 1), [Validators.required]),
    female: new FormControl(false, [Validators.required]),
    muslim: new FormControl(true, [Validators.required]),
    hasDisability: new FormControl(false),
    disabilityType: new FormControl(''),
  })

  disabilitySelected: boolean | null | undefined = false;

  get arabicOnlyError(): TuiValidationError | null {
      return this.basicInfoForm.controls['fullName'].hasError('pattern') ? this.arabicError : null;
  }
  get nationalIDError() : TuiValidationError | null {
    return this.basicInfoForm.controls['nationalId'].hasError('pattern') ? this.nationalIdError : null;
}

  ngOnInit() {
    this.getFormDataById();
    this.getGovs();
    this.getBirthAndGenderfromId();
    this.getAffiliateParties();
  }

  disabilityTypeShow() {
    let disabilityValue = this.basicInfoForm.value.hasDisability;
    this.disabilitySelected = disabilityValue
  }

  getFormDataById() {
   this.requestStatusRepository.get().subscribe({
     next: (response) => {
       this.requestId = response.id;
       this.getSetFormData(response.id);
     },
     error: () => {
      this.newUser = true;
     }
   })
  }

  getSetFormData(requestId: number) {
    this.requestBasicInformationRepository.getBasicInformation(requestId).subscribe(
      (response) => {
        this.basicInfoForm.patchValue(response);
        this.formId = response.id;
        this.setPartyDropdown();
        this.selectAffiliateClub();
        this.setDisabilitiesTypeName(response.disabilityType);
        this.disabilityTypeShow();
      }
    )
  }

  getGovs() {
    this.govermentRepository.get().subscribe(
      (response) => {
        this.govs = response.data;
      }
    );
  }

  getDistricts() {
    this.basicInfoForm.get('district')?.reset();
    this.basicInfoForm.get('eductionAdministration')?.reset();
    this.basicInfoForm.get('alAzhar')?.reset();
    this.basicInfoForm.get('youthCentre')?.reset();
    
    this.resetClub()

    this.districts = [];
    const govId = this.basicInfoForm.value.governorate?.['id'];
    this.districtRepository.getDistricts(govId).subscribe(
      (response) => {
        this.districts = response.data;
      }
    );
  }

  getAffiliateParties() {
    this.affiliatePartyRepository.get().subscribe((response: any) => {
      this.affiliateParties = response.data;
    })

  }

  getEduAdmin() {
    const govId = this.basicInfoForm.value.governorate?.['id'];
    this.eduAdminRepository.getEducationsAdministration(govId).subscribe((response: any) => {
      this.eduAdmins = response.data;
    })
  }

  getAzharAdmin() {
    const govId: number = this.basicInfoForm.value.governorate?.['id']!;
    this.azharRepository.getAzhar(govId).subscribe((response) => {
      this.azharAdmins = response.data;
    })
  }

  getAffiliateClubs() {
    this.affiliateClubRepository.get().subscribe((response) => {
      this.affiliateClubs = response.data;
    })
  }

  getYouthCenters() {
    const districtId = this.basicInfoForm.value.district?.['id'];
    this.youthCenterRepository.getYouthCenter(districtId).subscribe((response: any) => {
      this.youthCenters = response.data;
    })
  }

  getClubs() {
    const govId: number = this.basicInfoForm.value.governorate?.['id']!;
    this.clubRepository.getClubs(govId).subscribe((response: any) => {
      this.clubs = response.data;
    })
  }

  getBirthAndGenderfromId() {
    this.basicInfoForm.get('nationalId')?.valueChanges
      .subscribe((id: any) => {
        const idString = id.toString();
        if (idString.length == 14) {
          const formatedDOB = new BirthDateFromNationalIdPipe().transform(idString)
          this.basicInfoForm.get('dob')?.patchValue(new TuiDay(formatedDOB[0], formatedDOB[1], formatedDOB[2]))
          const gender = new GenderFromNationalIdPipe().transform(idString)
          this.basicInfoForm.get('female')?.patchValue(gender)
        }
      })
  }

  setPartyDropdown() {
    const partyId = this.basicInfoForm.value.affiliateParty?.['id'];

    if (partyId == 2) {
        this.affiliateClub = '';
        this.selectedParty = 2;
        this.basicInfoForm.get('alAzhar')?.setValidators(Validators.required);
        this.basicInfoForm.get('affiliateClub')?.clearValidators();
        this.basicInfoForm.get('eductionAdministration')?.clearValidators();
        this.basicInfoForm.get('youthCentre')?.clearValidators();
        this.basicInfoForm.get('club')?.clearValidators();
        this.basicInfoForm.get('youthCentre')?.reset();
        this.basicInfoForm.get('club')?.reset();
        this.basicInfoForm.get('affiliateClub')?.reset();
        this.basicInfoForm.get('eductionAdministration')?.reset();
        this.getAzharAdmin();
    } else if (partyId == 3) {
        this.selectedParty = 3;
        this.basicInfoForm.get('affiliateClub')?.setValidators(Validators.required);
        this.basicInfoForm.get('eductionAdministration')?.clearValidators();
        this.basicInfoForm.get('alAzhar')?.clearValidators();
        this.basicInfoForm.get('eductionAdministration')?.reset();
        this.basicInfoForm.get('alAzhar')?.reset();
        this.getAffiliateClubs();

    } else if (partyId == 1) {
        this.affiliateClub = '';
        this.selectedParty = 1;
        this.basicInfoForm.get('eductionAdministration')?.setValidators(Validators.required);
        this.basicInfoForm.get('alAzhar')?.clearValidators();
        this.basicInfoForm.get('affiliateClub')?.clearValidators();
        this.basicInfoForm.get('youthCentre')?.clearValidators();
        this.basicInfoForm.get('club')?.clearValidators();
        this.basicInfoForm.get('youthCentre')?.reset();
        this.basicInfoForm.get('club')?.reset();
        this.basicInfoForm.get('affiliateClub')?.reset();
        this.basicInfoForm.get('alAzhar')?.reset();
        this.getEduAdmin();
    }

  }

  selectAffiliateClub() {
    const affiliateClubId = this.basicInfoForm.value.affiliateClub?.['id'];
    if (affiliateClubId === 1) {
      this.affiliateClub = "club"
      this.basicInfoForm.get('club')?.setValidators(Validators.required);
      this.basicInfoForm.get('youthCentre')?.clearValidators();
      this.basicInfoForm.get('youthCentre')?.reset();
      this.getClubs();
    } else if (affiliateClubId === 2) {
      this.affiliateClub= "youthCenter"
      this.basicInfoForm.get('youthCentre')?.setValidators(Validators.required);
      this.basicInfoForm.get('club')?.clearValidators();
      this.basicInfoForm.get('club')?.reset();
      this.getYouthCenters();
    }
  }

  setDisabilitiesTypeName(englishName: string) {
    const disability = this.disabilities.find(
      (disability) => disability.englishName === englishName
      );
      this.selectedDisability = disability?.arabicName;

  }

  districtSelected() {
    this.resetYouthCenter();
  }

  resetClub() {
    if (this.affiliateClub === 'club') {
      this.basicInfoForm.get('club')?.reset();
      this.clubs = [];
      this.getClubs();
    }
  }

  resetYouthCenter() {
    if (this.affiliateClub === 'youthCenter') {
      this.basicInfoForm.get('youthCentre')?.reset();
      this.youthCenters = [];
      this.getYouthCenters();
    }
  }

  govStringify = (gov: { arabicName: string }): string =>
    `${gov.arabicName}`;

  districtStringify = (district: { arabicName: string }): string =>
    `${district.arabicName}`;

  affiliatePartyStringify = (affiliateParty: { arabicName: string }): string =>
    `${affiliateParty.arabicName}`;

  eduAdminStringify = (eduAdmins: { arabicName: string }): string =>
    `${eduAdmins.arabicName}`;

  azharStringify = (azharAdmins: { arabicName: string }): string =>
    `${azharAdmins.arabicName}`;

  clubStringify = (clubs: { arabicName: string }): string =>
    `${clubs.arabicName}`;

  affiliateClubStringify = (affiliateClubs: { arabicName: string }): string =>
    `${affiliateClubs.arabicName}`;

  youthCenterStringify = (youthCenters: { arabicName: string }): string =>
    `${youthCenters.arabicName}`;

  disabilitiesStringify = (disabilities: { arabicName: string }): string =>
    `${disabilities.arabicName}`;


  next() {
    if (this.basicInfoForm.valid) {
      if (this.newUser) {
        this.requestBasicInformationRepository
        .addBasicInformation(this.requestId, this.basicInfoForm.value)
        .subscribe();

      } else {
        this.basicInformationRepository.update(this.formId, this.requestId, this.basicInfoForm.value)
        .subscribe();
      }

      this.stepperStateService.mainDataState.set('pass')
      this.router.navigate(['/voter-data/contact-data'], { skipLocationChange: true })
    } else {
      this.stepperStateService.mainDataState.set('error')
    }
  }
}
