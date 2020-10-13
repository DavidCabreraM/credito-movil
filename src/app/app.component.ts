import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

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
  constructor(
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('es');
    translate.use('es')
    this.initializeApp();
    this.sideMenu();
    this.onUser();
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
  onUser(){
    this.storage.get('user').then((val) => {
      this.user = JSON.parse(val).usuario;
      this.m_client = this.user.nombre + ' ' + this.user.apellidoPaterno + ' ' + this.user.apellidoMaterno ;
    });

        
        
  }
  sideMenu()
  {
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
        url   : '/account/1',
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
        url: '/home',
        icon: 'qr-code-outline',
        disabled: true
      }
    ];
  }
}
