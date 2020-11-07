import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoansService } from '../../services/loans/loans.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  public plazo_min:string;
  public plazo_max: string;
  formPrestamo: FormGroup;

  public identificador: string;

  public destionPrestamo: any[];
  public tipoFrecuencia: any[];
  public tiposPlazos: any[];

  public selectDestinoPrestamo: any[];
  public selectTipoFrecuencia: any[];
  public selectTipoPlazo: any[];

  public clear: string;

  constructor(private serviceLoan: LoansService, 
              private alertController: AlertController, 
              private router: Router,
              private form: FormBuilder,
              private loadingController: LoadingController) {
    this.titulo = 'APPLYLOAN';
    
   }

  ngOnInit() {
    this.formPrestamo = this.form.group({
      limitePlazo: ['', Validators.required],
      plazo: ['', Validators.required],
      destino: ['', Validators.required],
      pagos: ['', Validators.required],
      amount:['', Validators.required]
    });
    this.presentLoading();
    this.serviceLoan.parameter().subscribe(data => {
      console.log(data);
      this.identificador = data.prestamos.identificadorProducto;
      this.destionPrestamo = data.prestamos.destinoPrestamo;
      this.tipoFrecuencia = data.prestamos.tipoFrecuencia;
      this.tiposPlazos = data.prestamos.tiposPlazo;
      this.amount = data.prestamos.limitesMonto.minimo + '.00';
      this.amount_min = data.prestamos.limitesMonto.minimo;
      this.amount_max = data.prestamos.limitesMonto.maximo;
      this.plazo_min = data.prestamos.limitesPlazo.minimo;
      this.plazo_max = data.prestamos.limitesPlazo.maximo;
      console.log(this.amount_min);
    });
  } 

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Porfavor Espere...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro que deseas salir?',
      message: 'No guardaremos los datos que hayas ingresado.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'colorAlert',
        }, {
          text: 'Ok',
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
    console.log(even);
      this.amount = even.detail.value;
  }

  onPlazo(even: any){
    console.log(even);
    this.selectTipoPlazo = this.tiposPlazos[even.detail.value];
    console.log(this.selectTipoPlazo);
  }

  onPago(even: any){
    this.selectTipoFrecuencia = this.tipoFrecuencia[even.detail.value];
  }

  onDestino(even: any){
    this.selectDestinoPrestamo = this.destionPrestamo[even.detail.value];
  }

  onEnviar(){
   
    this.serviceLoan.prestamo({
      'identificadorProducto': this.identificador,
        'monto': this.amount,
        'tipoPlazo': this.selectTipoPlazo,
        'tipoFrecuencia': this.selectTipoFrecuencia,
        'destinoPrestamo':this.selectDestinoPrestamo
    }).toPromise().then(response => {
        console.log(JSON.parse(response));
        console.log('entro');
        this.router.navigate(['/request-received']);
    }).catch( err => {
        console.log(err);
    }).finally(() =>{
    });
  }

}
