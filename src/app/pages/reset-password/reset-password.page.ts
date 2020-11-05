import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserServiceService } from '@services/user/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(
    private form: FormBuilder,
    private translate: TranslateService,
    private userServiceService : UserServiceService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  formChangePassword: FormGroup;
  hide = true;
  ngOnInit() {
    this.formRegister()
  }
  
  formRegister(){
    this.formChangePassword = this.form.group({
      nClient: ['', [
        Validators.pattern("^[0-9]{9}$"),
        Validators.min(1)
      ]],
      code: ['', [
        Validators.required
      ]],
      curp: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZñÑ]{4}[\d]{6}(H|h|M|m)[a-zA-Z]{5}[a-zA-Z0-9]{2}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}")
      ]],
      password2: ['', [
        Validators.required
      ]]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('password2').value;
    if(pass === confirmPass){
      return group.get('password2').setErrors(null)
    }else{
      return group.get('password2').setErrors({notEquivalent: true})
    }    
  }

  sendCode(){
    console.log(this.formChangePassword.get('nClient').value)
    this.userServiceService.requestChange(this.formChangePassword.get('nClient').value).toPromise().then(promise =>{
      console.log(promise)
    }).catch(err =>{
      console.log(err)
    })
  }

  resetPassword(){
    this.userServiceService.resetPassword(this.formChangePassword.value).toPromise().then(promise =>{
      console.log(promise)
      this.translate.get(['PASSCHANGED','LOGINAGAIN']).subscribe(
        value => {
          this.presentAlert(value.PASSCHANGED+"!",value.LOGINAGAIN);
        }
      )
      this.router.navigate(['/login']);
    }).catch(err =>{
      this.translate.get('BADCODE').subscribe(
        value => {
          this.presentAlert('Error!',value);
        }
      )
      
    })
  }

      //Alertas
  async presentAlert(header,msj) {
    const alert = await this.alertController.create({
      header: header,
      message: msj,
      buttons: ['OK']
    });
    
    await alert.present();
  }
}
