import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { LoansService } from '@services/loans/loans.service';
import { VarglobalesService } from '../../services/varglobales/varglobales.service';

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
  public prestamos: any;
  @Output() public dashboardData = new EventEmitter<any>();
  arrayMovements: any;
  eventRefesh: any;
  public urlAvatar = '';
  data: any;

  sliderConfig = {
    slidesPerView: 5,
    spaceBetween: 2,
    centeredSlides: true
  };

  public iconexpand = 'chevron-down-outline';
  expanded: boolean = false;
  public user:any;
  public no_cuenta:string;
  key: string = 'dashboard';

  constructor(private storage: Storage, 
    private menuCtrl: MenuController,
    private serviceLoand: LoansService,
    private translate: TranslateService,
    private alertController: AlertController,
    private varGlobal: VarglobalesService
    ) {
      this.storage.remove('dashboard');
      this.storage.remove('avatar');
    }

  ngOnInit(){
    //location.reload();
    this.onInitCards();

    this.storage.get('user').then((val) => {
      this.user = JSON.parse(val).usuario;
      this.varGlobal.setClient(this.user.nombre + ' ' + this.user.apellidoPaterno + ' ' + this.user.apellidoMaterno);
      this.no_cuenta = this.user.accountNo;
      this.serviceLoand.selfi(this.no_cuenta).subscribe(data=> {
         this.createImageFromBlob( data, this.no_cuenta);
      }, error=>{
        this.varGlobal.setavatar('/assets/img/avatar/avatar.svg');
        this.urlAvatar = this.varGlobal.getavatar();
      });
    });
    
  
    /*this.serviceLoand.dashboard().subscribe(data =>{
      console.log(data);
      this.storage.set(this.key, JSON.stringify(data));
      this.arrayMovements = data.movs
     // this.storage.set('dashboard', this.dashboard);
    });*/
    //this.getMovements(688);
    //this.dashboard = this.dashboardService.dashboard();
    
   // this.urlAvatar = '/assets/img/avatar/stan-lee.jpg';
  }

  createImageFromBlob(image: Blob, noaccount: string) {
  
    let reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onload = (event: any) => {
      console.log(event);
      let image = event.target.result;
     
      console.log();
      this.storage.set('selfi', JSON.stringify(image));
      this.varGlobal.setavatar(image);
      this.urlAvatar = image;
     
    }
  }

  onInitCards(){
    this.serviceLoand.dashboard().subscribe(data =>{
        this.storage.set(this.key, JSON.stringify(data.prestamos)).then(()=>{
          this.prestamos = data.prestamos;
          console.log(this.prestamos);
          this.arrayMovements=data.movs;
        });
    });
  }

  doRefresh(event){
    this.onInitCards();
    location.reload();
    event.target.complete();
  }

  menuSalir(){
    this.menuCtrl.open('first');
  }

  getMovements(id){
    this.arrayMovements=null;
    this.serviceLoand.getMoviments(id).toPromise().then( response =>{
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
