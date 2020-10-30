import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { UserServiceService } from '@services/user/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private form: FormBuilder,
    private userServiceService : UserServiceService
  ) { }

  formChangePassword: FormGroup;
  hide = true;
  ngOnInit() {
    this.formulario()
  }
    
  formulario(){
    this.formChangePassword = this.form.group({
      password: ['', [
        Validators.required
      ]],
      newpassword: ['', [
        Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}")
      ]],
      password2: ['', [
        Validators.required
      ]]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newpassword').value;
    let confirmPass = group.get('password2').value;
    if(pass === confirmPass){
      return group.get('password2').setErrors(null)
    }else{
      return group.get('password2').setErrors({notEquivalent: true})
    }    
  }

  changePassword(){
    this.userServiceService.changePassword(this.formChangePassword.value).toPromise().then(promise =>{
      console.log(promise)
    }).catch(err =>{
      console.log(err)
    })
  }
}
