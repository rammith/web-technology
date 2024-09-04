import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveform';
  msge = "";
  submitted = false;
  userDetails: any;

  frm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z_a-z]+$/)]),
    lastname: new FormControl('', [Validators.maxLength(6), Validators.required]),
    emailid: new FormControl('', [Validators.email, Validators.required]),
    gender: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    isverified: new FormControl(false, Validators.requiredTrue),
    languages: new FormControl([], Validators.required)
  });

  onSubmit() {
    if (this.frm.valid) {
      this.userDetails = this.frm.value;
      this.submitted = true;
      this.msge = "Form submitted successfully!";
    } else {
      this.msge = "Please fill out the form correctly.";
    }
  }

  onCheckboxChange(e: any) {
    const languages: FormControl = this.frm.get('languages') as FormControl;
    if (e.target.checked) {
      languages.setValue([...languages.value, e.target.value]);
    } else {
      languages.setValue(languages.value.filter((value: string) => value !== e.target.value));
    }
  }
}