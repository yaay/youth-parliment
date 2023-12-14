import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatusRepository } from 'src/app/domain/request-status/request-status.repository';
import { RequestRepository } from 'src/app/domain/request-status/request.repository';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent {
  statusValue:string="";
  requestValue:string = "";
  showBtn:boolean=true;

  constructor(private router: Router,private reqStatusRepository:RequestStatusRepository,
    private ReqRepository:RequestRepository) {}

  startApplication() {
    this.reqStatusRepository.get().subscribe({
    error: () =>
      {
        this.ReqRepository.add({}).subscribe(_=>{
        this.router.navigate(['/voter-data'])
      });
      },
      next: (res) => {
      if (res.requestStatus.code == "DRAFT")
      this.router.navigate(['/voter-data'])
            }
    });
  }
  ngOnInit(){
    this.startbtn();
  }
  startbtn(){
    this.reqStatusRepository.get().subscribe({
      error: () =>
      {
        this.requestValue = "بدأ الطلب",
        this.statusValue="تقديم الطلب"
      },
      next: (res) => {
      if (res.requestStatus.code == "DRAFT")
      {
        this.requestValue = "غير مكتمل"
        this.statusValue="استكمال الطلب";
      }
        else if(res.requestStatus.code == "NEW_REQUEST")
        {
          this.showBtn=false;
          this.requestValue = "تم تقديم الطلب"
        }
            }
  });

  }
}
