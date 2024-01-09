import { Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  loader:boolean=false;

  constructor(private alerts: TuiAlertService
    ) { }
  toggleLoader() {
    this.loader = !this.loader
  }
  confirmMessage(){
    this.toggleLoader()
    this.alerts
      .open('تم اضافة البيانات بنجاح', { status: 'success', autoClose: 5000 })
      .subscribe()
  }
  errorMessage(){
    this.toggleLoader()
    this.alerts
      .open('حدث خطأ لا يمكن الحصول علي المستخدم', { status: 'error', autoClose: 5000 })
      .subscribe()
  }
}
