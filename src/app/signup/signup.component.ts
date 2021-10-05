import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  confirm_clicked=false;
  formGroup!: FormGroup;

  password:string ='';
  confirmPassword:string = '';
  clicked = false;

  constructor(private formBuilder:FormBuilder, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      password : new FormControl('',[Validators.required,
        this.upperPassword.bind(this),
        this.lowerPassword.bind(this),
        this.numberPassword.bind(this),
        this.symbolPassword.bind(this)]),
      confirmPassword : new FormControl('',Validators.required),
  },{
      validators: this.mustMatch('password', 'confirmPassword')
    })

      this.formGroup.get("password")?.valueChanges.subscribe(pass => {
      this.password = pass
  })

    this.formGroup.get("confirmPassword")?.valueChanges.subscribe(pass => {
        this.confirmPassword=pass
    })

  }

  homePage() {
    this.router.navigateByUrl('/main');
    this.toastr.success('Welcome');
  }

  submit(){    
    this.confirm_clicked=true
  }

  symbol(str:string){
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str)
  }

  number(str:string){
    return /\d/.test(str)
  }

  isUpper(str:string) {
    return /[A-Z]/.test(str);
  }

  islower(str:string) {
    return /[a-z]/.test(str);
  }

  symbolPassword(formcontrol:FormControl){
    if(!this.symbol(formcontrol.value)){
      return {'symbol':true}
    }
    return null
  }

  upperPassword(formcontrol:FormControl){
    if(!this.isUpper(formcontrol.value)){
      return {'isUpper':true}
    }
    return null
  }

  lowerPassword(formcontrol:FormControl){
    if(!this.islower(formcontrol.value)){
      return {'isLower':true}
    }
    return null
  }

  numberPassword(formcontrol:FormControl){
    if(!this.number(formcontrol.value)){
      return {'Number':true}
    }
    return null
  }

  mustMatch(controlName: string, matchingControlName: string){
    return(formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors.mustMatch){
        return 
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true});
      }
      else{
        matchingControl.setErrors(null);
      }
    }
  }
  
}
