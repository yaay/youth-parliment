import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  readonly testForm = new FormGroup({
    testValue: new FormControl('mail@mail.ru'),
});

}
