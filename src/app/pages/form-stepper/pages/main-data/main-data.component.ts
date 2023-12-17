import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { GovernmentRepository } from 'src/app/domain/government/government.repository';
import { minWordsValidator } from 'src/app/shared/Validators/minWords.validator';
import { TuiDay, TuiStringHandler } from '@taiga-ui/cdk';
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

@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.css'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: `هذه الخانة مطلوبه`,
        pattern: 'أدخل رقم قومي صحيح',
        minWords: 'يرجي أدخال الاسم رباعي'
      }
    }
  ]
})
export class MainDataComponent {

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
    private youthCenterRepository: YouthCenterRepository
  ) { }

  genders = [{ gender: 'male' }, { gender: 'female' }];
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
    fullName: new FormControl(null, [Validators.required, minWordsValidator(4)]),
    nationalId: new FormControl(null, [Validators.required, Validators.pattern(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/)]),
    government: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    affiliateParty: new FormControl(null, [Validators.required]),
    educationsAdministration: new FormControl(null),
    azhar: new FormControl(null),
    club: new FormControl(null),
    affiliateClubs: new FormControl(null),
    youthCenters: new FormControl(null),
    dob: new FormControl(new TuiDay(2007, 0, 1)),
    gender: new FormControl('', [Validators.required]),
    religion: new FormControl('muslim'),
    disability: new FormControl('no'),
  })

  ngOnInit() {
    this.getGovs();
    this.getBirthAndGenderfromId();
    this.getAffiliateParties();
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
    this.districts = [];
    const govId = this.basicInfoForm.value.government?.['id'];
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
    const govId = this.basicInfoForm.value.government?.['id'];
    this.eduAdminRepository.getEducationsAdministration(govId).subscribe((response: any) => {
      this.eduAdmins = response.data;
    })
  }

  getAzharAdmin() {
    const govId: number = this.basicInfoForm.value.government?.['id']!;
    this.azharRepository.getAzhar(govId).subscribe((response: any) => {
      this.azharAdmins = response.data;
    })
  }

  getAffiliateClubs() {
    this.affiliateClubRepository.get().subscribe((response: any) => {
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
    const govId: number = this.basicInfoForm.value.government?.['id']!;
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
          this.basicInfoForm.get('gender')?.patchValue(gender)
        }
      })
  }

  setPartyDropdown() {
    const partyId = this.basicInfoForm.value.affiliateParty?.['id'];

    if (partyId == 2) {
        this.affiliateClub = '';
        this.selectedParty = 2;
        this.basicInfoForm.get('azhar')?.setValidators(Validators.required);
        this.basicInfoForm.get('affiliateClubs')?.clearValidators();
        this.basicInfoForm.get('educationsAdministration')?.clearValidators();
        this.basicInfoForm.get('youthCenters')?.clearValidators();
        this.basicInfoForm.get('club')?.clearValidators();
        this.basicInfoForm.get('youthCenters')?.reset();
        this.basicInfoForm.get('club')?.reset();
        this.basicInfoForm.get('affiliateClubs')?.reset();
        this.basicInfoForm.get('educationsAdministration')?.reset();
        this.getAzharAdmin();
    } else if (partyId == 3) {
        this.selectedParty = 3;
        this.basicInfoForm.get('affiliateClubs')?.setValidators(Validators.required);
        this.basicInfoForm.get('educationsAdministration')?.clearValidators();
        this.basicInfoForm.get('azhar')?.clearValidators();
        this.basicInfoForm.get('educationsAdministration')?.reset();
        this.basicInfoForm.get('azhar')?.reset();
        this.getAffiliateClubs();

    } else if (partyId == 1) {
        this.affiliateClub = '';
        this.selectedParty = 1;
        this.basicInfoForm.get('educationsAdministration')?.setValidators(Validators.required);
        this.basicInfoForm.get('azhar')?.clearValidators();
        this.basicInfoForm.get('affiliateClubs')?.clearValidators();
        this.basicInfoForm.get('youthCenters')?.clearValidators();
        this.basicInfoForm.get('club')?.clearValidators();
        this.basicInfoForm.get('youthCenters')?.reset();
        this.basicInfoForm.get('club')?.reset();
        this.basicInfoForm.get('affiliateClubs')?.reset();
        this.basicInfoForm.get('azhar')?.reset();
        this.getEduAdmin();
    }

  }

  selectAffiliateClub() {
    const affiliateClubId = this.basicInfoForm.value.affiliateClubs?.['id'];
    if (affiliateClubId === 1) {
      this.affiliateClub = "club"
      this.basicInfoForm.get('club')?.setValidators(Validators.required);
      this.basicInfoForm.get('youthCenters')?.clearValidators();
      this.basicInfoForm.get('youthCenters')?.reset();
      this.getClubs();
    } else if (affiliateClubId === 2) {
      this.affiliateClub= "youthCenter"
      this.basicInfoForm.get('youthCenters')?.setValidators(Validators.required);
      this.basicInfoForm.get('club')?.clearValidators();
      this.basicInfoForm.get('club')?.reset();
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


  next() {
    if (this.basicInfoForm.valid) {
      const formValue = this.basicInfoForm.value
      formValue.government = this.basicInfoForm.value.government?.['id']
      console.log(formValue)
      this.stepperStateService.mainDataState.set('pass')
      this.router.navigate(['/voter-data/contact-data'], { skipLocationChange: true })
    } else {
      this.stepperStateService.mainDataState.set('error')
    }
  }


}
