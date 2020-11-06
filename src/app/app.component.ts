import { Component, OnChanges, OnInit } from '@angular/core';

import { Platform, LoadingController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { VarglobalesService } from './services/varglobales/varglobales.service';
import { LoansService } from '@services/loans/loans.service';
import { ChangePasswordComponent } from '@components/modals/change-password/change-password.component';
import { ChangeLanguageComponent } from '@components/modals/change-language/change-language.component';
import { TranslateLocalService } from '@services/translate/translate-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{
  public client_name: any[];
  navigate : any;
  user: any;
  m_client:string;
  public urlAvatar = '';
  optionLanguage="es"
  languagesList = [
    {
      text:"Español",
      value:"es"
    },
    {
      text:"English",
      value:"en"
    },
  ]
  loading: HTMLIonLoadingElement;
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private router: Router,
    private avatarUrl: VarglobalesService,
    public loadingController:LoadingController,
    private loansService : LoansService,
    private modalController: ModalController,
    private translateLocal : TranslateLocalService
  ) {
    translate.setDefaultLang('es');
    translate.use('en');
    this.initializeApp();
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  onHome(){
    this.router.navigate(['/home']);
  }
  onCerrarSession(){
    this.storage.clear();
    this.presentLoading();
    setTimeout(() => {
      this.loading.dismiss();
      this.router.navigate(['/login']);
    }, 2000);
    
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Hasta Pronto...',
    });
    await this.loading.present();
  }

  onMenuUrl(url: number){
    this.storage.set('indexCard','0').then(()=>{
      this.router.navigate([url]);
    }); 
  }

  sideMenu()
  {
    /*this.storage.get('avatar').then((val) => {
      this.urlAvatar = val.avatar;
    }); */
    this.navigate =
    [
      {
        title : 'Inicio',
        url   : '/home',
        icon  : 'home-outline',
        disabled: false
      },
      {
        title : 'Mis Cuentas',
        url   : '/account/0',
        icon  : 'card-outline',
        disabled: false
      },
      {
        title : 'Solicitar un Prestamo',
        url   : '/applyfor-loan',
        icon  : 'thumbs-up-outline',
        disabled: true
      },
      {
        title: 'Codigo de barras y QR',
        url: '/references',
        icon: 'qr-code-outline',
        disabled: true
      },
    ];
  }

  update(){
    this.loansService.updateDetails().toPromise().then(promise =>{
      console.log(promise)
    }).catch(err =>{
      console.log(err)
    })
  }

  selectLanguage(langSelect){
    this.translateLocal.getLanguage();
    this.translate.use(langSelect);
  }

  async changePasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent,
      cssClass: "center-modal"
    });
    return await modal.present();
  }
  async changelanguageModal() {
    const modal = await this.modalController.create({
      component: ChangeLanguageComponent,
      cssClass: "center-modal"
    });
    return await modal.present();
  }
}
