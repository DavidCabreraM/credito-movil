import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { UserServiceService } from '@services/user/user-service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private form: FormBuilder,
    private userServiceService : UserServiceService,
    private alertController: AlertController,
    private router: Router,
    private modalCtrl: ModalController,
    private translate: TranslateService
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
      console.log("Good: ",promise)
      this.modalCtrl.dismiss();
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
      console.log("Error: ",err)
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
