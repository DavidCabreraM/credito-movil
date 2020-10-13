import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { LoansService } from '@services/loans/loans.service';

interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
  img: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dashboard: Observable<any>;
  public prestamos: any[] = [];
  @Output() public dashboardData = new EventEmitter<any>();
  arrayMovements: any;
  eventRefesh: any;
  public urlAvatar = '';

  sliderConfig = {
    slidesPerView: 5,
    spaceBetween: 2,
    centeredSlides: true
  };
 fecha = Date();
public data = [
    {
      icon: '',
      name: '',
      redirectTo: '',
      img: '/assets/img/cards/Tarjeta01_1.svg',
      accountNo: '000000012589',
      amount: 1468.00,
      pago:0,
      datepago: this.fecha
    },
    {
      icon: '',
      name: '',
      redirectTo: '',
      img: '/assets/img/cards/Tarjeta02.svg',
      accountNo: '0000000123456',
      amount: 4500,
      pago:50,
      datepago: this.fecha
    },
    {
      icon: '',
      name: '',
      redirectTo: '',
      img: '/assets/img/cards/Tarjeta01_1.svg',
      accountNo: '000000058965',
      amount:3000,
      pago:100,
      datepago: this.fecha
    }
  ];

  public iconexpand = 'chevron-down-outline';
  expanded: boolean = false;
  public noaccount:any;
  public no_cuenta:string;
  key: string = 'dashboard';

  constructor(private storage: Storage, 
    private menuCtrl: MenuController,
    private serviceLoand: LoansService,
    private translate: TranslateService,
    private alertController: AlertController
    ) {}

  ngOnInit(){
    this.serviceLoand.dashboard().subscribe(data =>{
      this.storage.set(this.key, JSON.stringify(data));
    });

    this.storage.get('user').then((val) => {
      this.noaccount = JSON.parse(val).usuario;
      this.no_cuenta = this.noaccount.accountNo;
      console.log(this.no_cuenta);
      this.serviceLoand.selfi(this.no_cuenta).subscribe(data=> {
        console.log(data);
          this.storage.set('selfi', JSON.stringify(data));
      });
    });
    
    this.serviceLoand.selfi('000124251').subscribe(data=> {
      console.log(data);
    });
    
    this.storage.get('selfi').then((val)=>{
      console.log(val);
    });
     
    /*this.serviceLoand.dashboard().subscribe(data =>{
      console.log(data);
      this.storage.set(this.key, JSON.stringify(data));
     // this.storage.set('dashboard', this.dashboard);
    });*/
    this.getMovements(688);
    //this.dashboard = this.dashboardService.dashboard();
    
    this.urlAvatar = '/assets/img/avatar/stan-lee.jpg';
  }

  onExpanded(){
    if(this.expanded){
      this.expanded=false;
      this.iconexpand = 'chevron-down-outline';
    } else {
      this.expanded=true;
      this.iconexpand = 'chevron-up-outline';
    }
    
  }

  menuSalir(){
    this.menuCtrl.open('first');
  }

  getMovements(id){
    this.arrayMovements=null;
    this.serviceLoand.getMoviments(id).toPromise().then( response =>{
      console.log("L: ",response.movs.length)
      this.arrayMovements = response.movs;
    }).catch( err => {
      this.translate.get("TRYAGAIN").subscribe(
        value => {
          this.presentAlert('Error!',value);
        }
      )
    }).finally(() => {   
      this.eventRefesh.target.complete();
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

}
