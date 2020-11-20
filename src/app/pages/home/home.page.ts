import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController, MenuController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { LoansService } from '@services/loans/loans.service';
import { VarglobalesService } from '../../services/varglobales/varglobales.service';
import { ModalController } from '@ionic/angular';
import { PendingLoanComponent } from '@components/modals/pending-loan/pending-loan.component';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
/*
interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
  img: string;
}*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dashboard: Observable<any>;
  public prestamos: any;
  prestamoPendiente = false;
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
  payments:any;
  eventSource = [];
  public proximosPagos:any;
  nextP: any;
  selectEvent:any;
  public fecha_pago:string;
  public monto_proximo: string;
  loading: HTMLIonLoadingElement;

  constructor(private storage: Storage,
    private menuCtrl: MenuController, 
    private serviceLoand: LoansService,
    private translate: TranslateService,
    private alertController: AlertController,
    private varGlobal: VarglobalesService,
    private modalController: ModalController,
    private calendarService: CalendarService,
    private loadingController: LoadingController,
    private router: Router
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
      let image = event.target.result;
  
      this.storage.set('selfi', JSON.stringify(image));
      this.varGlobal.setavatar(image);
      this.urlAvatar = image;
     
    }
  }

  onInitCards(){
    this.serviceLoand.dashboard().subscribe(data =>{
        this.storage.set(this.key, JSON.stringify(data.prestamos)).then(()=>{
          this.onNextDate(data.prestamos);
          this.varGlobal.setProximos(this.eventSource);
          this.storage.set('proximos', this.eventSource).then(()=>{
            console.log("Dato guardado");
            //Viajo a otra pagina
          });
          this.prestamos = data.prestamos;
          this.prestamoPendiente = this.prestamos.find( prestamo => prestamo.estatus === '100' );
          this.arrayMovements=data.movs;
        });
    },
    error => {
          this.translate.get('TRYAGAIN').subscribe(
            value => {
              this.presentLoading(value + '..!!'); 
            });
            setTimeout(() => {
              this.loading.dismiss();
              this.router.navigate(['/login']);
            }, 2000);
        }
      );
      
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  onNextDate(data:any) {
    for( let i= 0 ; i < data.length; i++) {
        this.calendarService.calendar(data[i].prestamo_id).toPromise().then( promise => {
          this.payments = promise;
           this.nextPayment();
          //this.prestamoPendiente = this.prestamos.find( prestamo => prestamo.estatus === '100' );
        });

    }

    this.storage.get('proximos').then((val)=>{
      console.log('');
    });
    //this.storage.set('proximosPagos', 'Hoal');
  }

  async nextPayment(){
    
    let hoy = new Date();
    hoy.setHours(0,0,0,0);
    
    for(let i=0 ; i < this.payments.length;i++){      
      let f1 = new Date(this.payments[i].fecha)
      f1.setHours(0,0,0,0);
      f1.setDate(f1.getDate()+1);

      if(f1 >= hoy){
        if(!this.nextP){
          this.nextP = this.payments[i];
          this.selectEvent = this.nextP;
          this.fecha_pago = this.selectEvent.fecha;
          this.monto_proximo = this.selectEvent.importe;
          this.eventSource.push({
            fechaProximoPago: this.fecha_pago
          });
          this.storage.set('proximos', this.eventSource).then(()=>{
            console.log("Dato guardado");
            //Viajo a otra pagina
          });
        }
        if(this.nextP >= f1){
          this.nextP = this.payments[i]
          this.selectEvent = this.nextP;
          this.fecha_pago = this.selectEvent.fecha;
          this.monto_proximo = this.selectEvent.importe;
          this.eventSource.push({
            fechaProximoPago: this.fecha_pago
          });
          this.storage.set('proximos', this.eventSource).then(()=>{
            console.log("Dato guardado");
            //Viajo a otra pagina
          });
        }
      }
    }
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

  async pendingLoanModal() {
    const modal = await this.modalController.create({
      component: PendingLoanComponent,
      componentProps: {
        'payment': this.prestamoPendiente
      },
      cssClass: "center-modal"
    });
    return await modal.present();
  }
}
