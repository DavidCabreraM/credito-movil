import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarService } from '@services/calendar/calendar.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detailloan',
  templateUrl: './detailloan.page.html',
  styleUrls: ['./detailloan.page.scss'],
})
export class DetailloanPage implements OnInit {
  public titulo: string;
  public segment: string;
  public parameter: string;
  public data: any;
  public account_no: string;
  public atrasado: boolean;
  public cuota: string;
  public monto_original:number;
  public nombre_producto:string;
  public plazo:number;
  public prestamo_account_no:string;
  public prestamo_id:string;
  public saldo_total:number;
  public saldo_vencido:string;
  public tipo_plazo:string;
  public fecha_vencimiento:string;
  public abono_capital: number = 0;
  public recibo_total_pendiente: number;
  public recibo_pendiente: any;
  public fecha_pago:string;
  public monto_proximo: string;
  payments:any;
  eventSource = [];
  nextP: any;
  selectEvent:any;
  loading: HTMLIonLoadingElement;
  
  constructor(private storage: Storage,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private calendarService: CalendarService,
    private loadingCtrl: LoadingController) {
    this.segment = 'Crédito';
    this.titulo = 'LOANDETAIL';
   }

  ngOnInit() {
    this.translate.get('PLEASEWAIT').subscribe(
      value => {
        this.presentLoading(value +"...");
      }
    );
    setTimeout(()=>this.loading.dismiss(),3500);
    this.parameter = this.route.snapshot.paramMap.get('id');

    this.storage.get('dashboard').then((val) => {
      let resul = JSON.parse(val);
      this.data = resul[this.parameter];
      this.onCargarData();
   });
  }

  onCargarData(){
    this.calendarService.calendar(this.data.prestamo_id).toPromise().then( promise => {
      this.payments = promise;
      for(let item of this.payments){
          if(item.pagado === true){
            this.abono_capital += item.capital;
          }
      }
      this.recibo_pendiente = this.payments.filter(recibo=> recibo.pagado == false);
      this.recibo_total_pendiente = this.recibo_pendiente.length - 1;
      this.nextPayment();
      //this.prestamoPendiente = this.prestamos.find( prestamo => prestamo.estatus === '100' );
    });
    this.account_no = this.data.account_no;
    this.atrasado = this.data.atrasado;
    this.cuota = this.data.cuota;
    this.monto_original = this.data.monto_original;
    this.nombre_producto = this.data.nombre_producto;
    this.plazo = this.data.plazo;
    this.translate.get(this.data.tipo_plazo).subscribe(
      value => {
        this.tipo_plazo = value;
      }
    );
    //this.tipo_plazo = this.data.tipo_plazo;
    this.fecha_vencimiento = this.data.fecha_vencimiento;
    this.saldo_vencido = this.data.saldo_vencido;
    this.saldo_total = this.data.saldo_total;
    /*if(this.data.estatus == 300)
         this.abono_capital = this.data.monto_original - this.data.saldo_total;
    else {
      this.abono_capital = 0;
    }*/
    /*if(this.data.monto_original === this.data.saldo_total){
      this.abono_capital = this.data.monto_original;
      this.saldo_total = this.data.monto_original - this.data.saldo_total;
    } else {
      this.abono_capital = this.data.monto_original - this.data.saldo_total;
    }*/
    
  }

  nextPayment(){
    
    let hoy = new Date();
    hoy.setHours(0,0,0,0);
    
    for(let i=0 ; i < this.payments.length;i++){      
      let f1 = new Date(this.payments[i].fecha)
      f1.setHours(0,0,0,0);
      f1.setDate(f1.getDate()+1);
      this.eventSource.push({
        startTime: f1,
        endTime: f1,
        allDay: false,
        payment:this.payments[i]
      });
      if(f1 >= hoy){
        if(!this.nextP){
          this.nextP = this.payments[i]
          this.selectEvent = this.nextP;
          this.fecha_pago = this.selectEvent.fecha;
          this.monto_proximo = this.selectEvent.importe;
        }
        if(this.nextP >= f1){
          this.nextP = this.payments[i]
          this.selectEvent = this.nextP;
          this.fecha_pago = this.selectEvent.fecha;
          this.monto_proximo = this.selectEvent.importe;
        }
      }
    }
  }

  async presentLoading(msj) {
      this.loading = await this.loadingCtrl.create({
      message: msj,
    });
    await this.loading.present();
  }

  onTipoPlazo(){

  }

}
