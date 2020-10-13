import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LoansService } from '@services/loans/loans.service';
import { IonSlides, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.page.html',
  styleUrls: ['./movements.page.scss'],
})
export class MovementsPage implements OnInit, AfterViewInit {
  fecha = Date();
  @ViewChild(IonSlides) slides: IonSlides;
  arrayMovements: any;
  eventRefesh: any;
  public prestamos: any[];
  idDetatail: string;
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
  constructor(
    private serviceLoans: LoansService,
    private alertController: AlertController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private storage: Storage
    ) {
      this.idDetatail=route.snapshot.paramMap.get("id");
      console.log(this.idDetatail)
      console.log(this.data)
  }

  ngOnInit() { 
    this.storage.get('dashboard').then((val) => {
      this.prestamos = JSON.parse(val).prestamos;
      console.log(this.prestamos)
    });
  }
  ngAfterViewInit(){
    this.slides.slideTo(parseInt(this.idDetatail))
    this.getMovements(688)
  }
  loanChanged() {

    //debe obtener el id del arreglo
    let index = this.slides.getActiveIndex().then( promise =>{
      console.log ("El índice actual es " + promise);
      //obtengo el id
      this.getMovements(688)
    });
  }

  doRefresh(event){
    this.eventRefesh = event;
    this.getMovements(688)
  }

  getDetails(){
    //lo obtendre de loc@l
    
    /*this.serviceLoans.getDetails(688).subscribe( response =>{
      console.log("D: ",response)
      this.getMovements(688)
    })*/
  }

  getMovements(id){
    this.arrayMovements=null;
    this.serviceLoans.getMoviments(id).toPromise().then( response =>{
      console.log("L: ",response.movs.length)
      this.arrayMovements = response.movs 
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
  //no
  lol:any =[]
  ordenDetails(id){
    const inventario = [
      {id:1,nombre: 'manzanas', cantidad: 2},
      {id:2,nombre: 'bananas', cantidad: 0},
      {id:3,nombre: 'cerezas', cantidad: 5}
    ];

    const resultado = inventario.find( l => l.id === id );

    console.log(resultado)
    this.lol.push(resultado)
    inventario.forEach(element => {
      if(element.id!=id){
        this.lol.push(element)
      }
    });
    console.log(this.lol)
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
