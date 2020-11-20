import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoansService } from '../../services/loans/loans.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { element } from 'protractor';

@Component({
  selector: 'app-applyfor-loan',
  templateUrl: './applyfor-loan.page.html',
  styleUrls: ['./applyfor-loan.page.scss'],
})
export class ApplyforLoanPage implements OnInit {
  public titulo: string;
  public amount: string;
  public amount_min: string;
  public amount_max: string;
  public plazo_min: number;
  public plazo_max: number;
  public selectSemana = false;
  formPrestamo: FormGroup;

  public identificador: string;

  public destionPrestamo: any[];
  public tipoFrecuencia: any[];
  public tiposPlazos: any[];

  public selectDestinoPrestamo: any[];
  public selectTipoFrecuencia: any[];
  public selectTipoPlazo;
  public plazoDeseado = [];

  public clear: string;

  public solicitud: boolean;

  loading: HTMLIonLoadingElement;

  constructor(private serviceLoan: LoansService, 
              private alertController: AlertController, 
              private router: Router,
              private form: FormBuilder,
              private loadingController: LoadingController,
              private storage: Storage,
              private translate: TranslateService) {
    this.titulo = 'APPLYLOAN';
    
   }

  ngOnInit() {
    this.formPrestamo = this.form.group({
      plazo: ['', Validators.required],
      destino: ['', Validators.required],
      pagos: ['', Validators.required],
      amount:['', Validators.required]
    });
    
    this.solicitudPendiente();
    let msg;
    this.translate.get('PLEASEWAIT').subscribe(value=>{
      msg = value + '...';
    });
    this.presentLoading(msg);
    this.serviceLoan.parameter().subscribe(data => {
      this.identificador = data.prestamos.identificadorProducto;
      this.destionPrestamo = data.prestamos.destinoPrestamo;
      this.tipoFrecuencia = data.prestamos.tipoFrecuencia;
      this.plazo_max = data.prestamos.limitesPlazo.maximo;
      this.plazo_min = data.prestamos.limitesPlazo.minimo;
      this.onTiposFrecuencia(data.prestamos.tiposPlazo);
      this.amount = data.prestamos.limitesMonto.minimo + '.00';
      this.amount_min = data.prestamos.limitesMonto.minimo;
      this.amount_max = data.prestamos.limitesMonto.maximo;
      });
      setTimeout(()=>{
            this.loading.dismiss();
            if(this.amount.length === 0){
              this.translate.get('TRYAGAIN').subscribe(val=>{
                msg = val + '...';
              });
                this.presentLoading(msg);
                setTimeout(()=>{
                  this.loading.dismiss();
                  this.router.navigate(['/home']);
                },3000);
            }
      },3000);
  } 

  onTiposFrecuencia(data: any){
    for(let item of data){
       let contador=0;
       let total;
       if(item.valor === 'Semanas') {
            total = 3;
        } else if(item.valor === 'Catorcenas'){
          total = 2;
        }else if(item.valor === 'Meses'){
          total = 4;
        }
        for(let i = 1; i < this.plazo_max; i++){
          let noPlazo;
          if(item.valor === 'Semanas') {
              noPlazo = this.plazo_min * i;
          } else if(item.valor === 'Catorcenas'){
            noPlazo = 13*i;
          }else if(item.valor === 'Meses'){
            noPlazo = 6*i;
          }
          this.plazoDeseado.push(
            {
              external_id: item.external_id,
              id: item.id,
              valor: item.valor,
              plazo: noPlazo
            });
          contador++;
          if(contador === total){
            break;
          }
        }
    }
    //this.tiposPlazos = data;
  }

  async presentLoading(msg: string) {
    
    this.loading = await this.loadingController.create({
      message: msg
    });
    await this.loading.present();
  }

  solicitudPendiente(){
    this.solicitud = false;
    this.storage.get('dashboard').then((val) => {
      let result = JSON.parse(val);
      for(let item of result){
        let msgAceptar = '';
          if(item.estatus === '100'){
            this.solicitud = true;
            this.translate.get('ACEPTAR').subscribe(
              value=>{
                  msgAceptar = value;
              });
            this.translate.get('PENDINGREQUEST').subscribe(
              value => {
                this.presentAlert(value +"!!", msgAceptar);
              }
            );
          }
      }
      //let data = resul[this.parameter];

   });

  }


  async presentAlert(msg,msgAcept) {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      backdropDismiss: false,
      message: msg,
      buttons: [
        {
          text: msgAcept,
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  alertConfirm(){
    this.translate.get('NOTSAVE').subscribe(
      value => {
        this.presentAlertConfirm(value , '');
      }
    );
  }

  async presentAlertConfirm(msj, head) {
    let option_cancel  = 'Regresar';
    let ok = 'Aceptar';
    if(msj === 'NotSave'){
      msj = 'No guardaremos los datos que hayas ingresado';
      head = '¿Estás seguro que deseas salir?';
    } else {
      msj = 'We will not save the data you have entered';
      head = 'Are you sure you want to quit?';
      option_cancel = 'To return';
      ok = 'To accept';
    }
    const alert = await this.alertController.create({
      header: head,
      message: msj,
      buttons: [
        {
          text: option_cancel,
          role: 'cancel',
          cssClass: 'colorAlert',
        }, {
          text: ok,
          handler: () => {
            this.tiposPlazos = [];
            this.tipoFrecuencia = [];
            this.tiposPlazos = [];
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  rangeChange(even:any){
      this.amount = even.detail.value;
  }

  onPlazo(even: any){
    this.formPrestamo.controls['pagos'].setValue('');
    this.selectTipoPlazo=[];
    let select = this.plazoDeseado[even.detail.value];
    this.selectTipoPlazo = even.detail.value;
    if(select['valor'] === 'Semanas'){
      this.selectSemana = true;
    } else {
      this.selectSemana = false;
    }
  }


  onPago(even: any){
    this.selectTipoFrecuencia = this.tipoFrecuencia[even.detail.value];
  }

  onDestino(even: any){
    this.selectDestinoPrestamo = this.destionPrestamo[even.detail.value];
  }

  onEnviar(){
    let selectTipoPlazo = this.plazoDeseado[this.selectTipoPlazo];
    this.serviceLoan.prestamo({
      'identificadorProducto': this.identificador,
        'monto': this.amount,
        'tipoPlazo': 
          {
            id: selectTipoPlazo.id,
            valor: selectTipoPlazo.valor,
            external_id: selectTipoPlazo.external_id
          }
        ,
        'tipoFrecuencia': this.selectTipoFrecuencia,
        'destinoPrestamo':this.selectDestinoPrestamo
    }).toPromise().then(response => {
        this.router.navigate(['/request-received']);
    }).catch( err => {
      let msg;
      this.translate.get('TRYAGAIN').subscribe(val=>{
        msg = val + '...';
      });
        this.presentLoading(msg);
        setTimeout(()=>{
          this.loading.dismiss();
          this.router.navigate(['/home']);
        },3000);
        console.log(err);
    }).finally(() =>{
    });
  }

}
