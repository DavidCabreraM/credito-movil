import { Component, OnChanges, OnInit } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { VarglobalesService } from './services/varglobales/varglobales.service';

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
  loading: HTMLIonLoadingElement;
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private router: Router,
    private avatarUrl: VarglobalesService,
    public loadingController:LoadingController
  ) {
    translate.setDefaultLang('es');
    translate.use('es');
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
        url   : '/home',
        icon  : 'thumbs-up-outline',
        disabled: true
      },
      {
        title: 'Codigo de barras y QR',
        url: '/references',
        icon: 'qr-code-outline',
        disabled: true
      }
    ];
  }
}
