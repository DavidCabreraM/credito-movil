import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VarglobalesService } from '../../services/varglobales/varglobales.service';

@Component({
  selector: 'app-cards-loan',
  templateUrl: './cards-loan.component.html',
  styleUrls: ['./cards-loan.component.scss'],
})
export class CardsLoanComponent implements OnInit, AfterViewInit {
  @Input()  prestamos: any;
  proximosPagos: any = [];
  public totalbalance:string;

  @ViewChild(IonSlides) slides: IonSlides;
  public dashboard: any;

  public img = {one: '/assets/img/cards/Tarjeta1.svg', two: '/assets/img/cards/Tarjeta2.svg'};

  sliderConfig = {
    slidesPerView: 1.2,
    spaceBetween: .3,
    centeredSlides: true
  };


 // public proximosPagos = [];

  
  constructor(private storage: Storage,  private router: Router, private translate: TranslateService, private varGlobal: VarglobalesService) {
    this.totalbalance = 'TOTALBALANCE'; 
     this.onProximosPagos();
   }

  ngOnInit() {
    console.log('onInit');
    this.onProximosPagos();
    if(this.prestamos === null){
      this.onPrestamosNull();
    }else{
      this.onProximosPagos();
      this.storage.get('accountNumber').then( (val) =>{
        console.log(val)
        if(val===null){
          console.log("No existe")
          this.storage.set('indexCard', 0);
          this.storage.set('accountNumber', this.prestamos[0].prestamo_id);
        }
      });
    } 
    
    //location.reload();
    /*this.storage.get('dashboard').then((val) => {
      console.log(val);
    this.prestamos = JSON.parse(val);
    console.log(this.prestamos);
    console.log(this.prestamos.length);
    });*/
   }
  
   onPrestamosNull(){
    this.prestamos = [
      {
        prestamo_account_no: '000000000',
        saldo_total: 0,
        saldo_vencido: 0,
        vencido_desde: new Date()
      }
    ];
   }

   onProximosPagos(){

    this.storage.get('proximos').then((val) => {
      setTimeout(()=>{
        console.log(val);
        console.log('entroe pagos');
        this.proximosPagos = val ;
        if(this.proximosPagos.length === 0){
          console.log('entro if');
          this.proximosPagos = this.varGlobal.getProximos();
        }
        console.log(this.proximosPagos);
      },300);
    });
 
   }

   onMontoProximo(i: number){
     console.log(this.proximosPagos.length);
     console.log(this.varGlobal.getProximos());
     if(this.proximosPagos.length === 0){
       console.log('entro data');
       this.proximosPagos = this.varGlobal.getProximos();
       console.log(this.proximosPagos[i]);
     }
     return this.proximosPagos[i].montoProximoPago;
   }

   ngOnChanges(changes: SimpleChanges): void {
     console.log('onChabge');
     this.onProximosPagos();
      this.prestamos = changes.prestamos.currentValue;
     if(this.prestamos != undefined){
      if(this.prestamos.length === 0){
        this.onPrestamosNull();
      }
     }
     
   }


  onAccounts(id: number){
    this.storage.set('indexCard', JSON.stringify(id));
    this.router.navigate(['/account/', id]);
  }

  ngAfterViewInit(){
    this.onProximosPagos();
    this.storage.get('indexCard').then((val) => {
      setTimeout (() => {this.slides.slideTo(parseInt(val),350);}, 300);
    });  
  }

  loanChanged() {
    //debe obtener el id del arreglo
    let index = this.slides.getActiveIndex().then( promise =>{
      console.log ("El índice actual es " + promise);
      this.storage.set('indexCard', promise);
      this.storage.set('accountNumber', this.prestamos[promise].prestamo_account_no);
    });
  }

  onTranslateDay(day: string){
    switch(day){
      case 'Monday':
        return 'LUNES';
        break;
      case 'Tuesday':
        return 'MARTES';
        break;
      case 'Wednesday':
        return 'MIÉRCOLES';
        break;
      case 'Thursday':
        return 'JUEVES';
        break;
      case 'Friday':
        return 'VIERNES';
        break;
      case 'Saturday':
        return 'SÁBADO';
        break;
      case 'Sunday':
        return 'DOMINGO';
        break;
    }
  }

}
