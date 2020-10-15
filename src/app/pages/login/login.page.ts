import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { UserServiceService } from '@services/user/user-service.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hide = true;
  form_login: FormGroup;
  loading: any;

  constructor(
    private form: FormBuilder, 
    private userService: UserServiceService,
    private alertController: AlertController,
    private loadingController:LoadingController,
    private translate: TranslateService,
    private router: Router,
    private storage: Storage
    ) {
      localStorage.removeItem("user");
    }

  ngOnInit() {
    this.formLogin();
  }
  formLogin(){
    this.form_login = this.form.group({
      nClient: ['', [
        Validators.required,
        Validators.pattern("^[0-9]{9}$")
      ]],
      password: ['', [
        Validators.required,
        //Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}")
      ]]
    });
  }

  login(){
    this.translate.get('WAIT').subscribe(
      value => {
        this.presentLoading(value+"...");
      }
    )
    this.userService.login(this.form_login.value).toPromise().then(response =>{
      this.storage.set('user', JSON.stringify(response));
     // this.storage.set('dashboard', this.dashboard);
     this.router.navigate(['/home']);
    }).catch( err => {
      this.translate.get('LOGINERROR').subscribe(
        value => {
          this.presentAlert("Error!",value);
        }
      )
    }).finally(() => {
      this.loading.dismiss();
    });

   /* this.userService.login(this.form_login.value).toPromise().then(response => {
      //Guardar local
       window.localStorage['user'] = JSON.stringify(response);
       //RedirectHome
       //this.router.navigate(['/home']);
       
     });
*/
    this.userService.login(this.form_login.value).toPromise().then(response => {
     //Guardar local
      window.localStorage['user'] = JSON.stringify(response);
      //RedirectHome
      this.router.navigate(['/home']);
      
    }).catch( err => {
      this.translate.get('LOGINERROR').subscribe(
        value => {
          this.presentAlert("Error!",value);
        }
      )
    }).finally(() => {
      this.loading.dismiss();
    })
  }

  async presentAlert(header,msj) {
    const alert = await this.alertController.create({
      header: header,
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message,
      cssClass: 'custom-class custom-loading'
    });
    return this.loading.present();
  }
}
