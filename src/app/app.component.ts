import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';

import { Platform, LoadingController, ModalController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { VarglobalesService } from './services/varglobales/varglobales.service';
import { LoansService } from '@services/loans/loans.service';
import { ChangePasswordComponent } from '@components/modals/change-password/change-password.component';
import { ChangeLanguageComponent } from '@components/modals/change-language/change-language.component';
import { PlatformLocation } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{
  @ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;

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
  ];
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
    private location: PlatformLocation,
    private alertController: AlertController
  ) {
    translate.setDefaultLang('es');
    let language = translate.getBrowserLang()
    translate.use(language);
    this.initializeApp();
    this.sideMenu();
    this.location.onPopState(async ()=>{
      console.log('ON POP');
      console.log(this.router.url);
      const modal = await this.modalController.getTop();
      if(modal){
        modal.dismiss();
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let salirMsj;
      let cancel;
      let close;
      this.translate.get('SALIR').subscribe(
        value=>{
            salirMsj = value + '?';
        }
      );
      this.translate.get('CANCEL').subscribe(
        value => {
            cancel = value;
        }
      );
      this.translate.get('CLOSE').subscribe(
        value=>{
            close = value;
        }
      );
      this.platform.backButton.subscribeWithPriority(0, async () => {
        if(this.router.url === '/home'){
          console.log(this.router.url);
          const alert = await this.alertController.create({
              message: salirMsj,
              buttons: [
                {
                  text: cancel,
                  role: "cancel"
                },
                {
                  text: close,
                  handler: () => {
                    this.onCerrarSession();
                    //navigator["app"].exitApp();
                  }
                }
              ]
          });
          await alert.present();
        }
         /* if(this.routerOutlet && this.routerOutlet.canGoBack()){
            this.routerOutlet.pop();
          } else if (this.router.url === "/home") {
            const alert = await this.alertController.create({
              header: "Close App",
              message: "Esta seguro de Salir de la app?",
              buttons: [
                {
                  text: "Cancel",
                  role: "cancel"
                },
                {
                  text: "Close App",
                  handler: () => {
                    navigator["app"].exitApp();
                  }
                }
              ]
            });
            await alert.present();
          }*/
      });
    });
  }
  onHome(){
    this.router.navigate(['/home']);
  }
  onCerrarSession(){
    this.storage.clear();
    this.translate.get('SEEYOUSOON').subscribe(
      value => {
        this.presentLoading(value +"...");
      }
    );
    //this.presentLoading();
    setTimeout(() => {
      this.loading.dismiss();
      this.router.navigate(['/login']);
    }, 2000);
    
  }

  async presentLoading(msj) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msj,
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
        title : 'START',
        url   : '/home',
        icon  : 'home-outline',
        img: false,
        traduction: 'START'
      },
      {
        title : 'MYACCOUNTS',
        url   : '/account/0',
        icon  : 'card-outline',
        img: false,
        traduction: 'MYACCOUNTS'
      },
      {
        title : 'ASKFORALOAN',
        url   : '/applyfor-loan',
        icon  : 'lucro.svg',
        img: true,
        traduction: 'ASKFORALOAN'
      },
      {
        title: 'BARCODEANDQR',
        url: '/references',
        icon: 'qr-code-outline',
        img: false,
        traduction: 'BARCODEANDQR'
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
