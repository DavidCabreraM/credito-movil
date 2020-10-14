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
  public img = {one: '/assets/img/cards/Tarjeta1.svg', two: '/assets/img/cards/Tarjeta2.svg'};
  @ViewChild(IonSlides) slides: IonSlides;
  arrayMovements: any;
  eventRefesh: any;
  public prestamos: any[];
  idDetatail: string;

  constructor(
    private serviceLoans: LoansService,
    private alertController: AlertController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private storage: Storage
    ) {
      this.idDetatail=route.snapshot.paramMap.get("id");
      console.log(this.idDetatail)
  }

  ngOnInit() { 
    this.storage.get('dashboard').then((val) => {
      this.prestamos = JSON.parse(val).prestamos;
      console.log(this.prestamos)
      this.getMovements(this.prestamos[this.idDetatail].prestamo_id)
    });
  }
  ngAfterViewInit(){
    setTimeout (() => {this.slides.slideTo(parseInt(this.idDetatail),250);}, 200);
  }
  loanChanged() {

    //debe obtener el id del arreglo
    let index = this.slides.getActiveIndex().then( promise =>{
      console.log ("El índice actual es " + promise);
      this.getMovements(this.prestamos[promise].prestamo_id)
    });
  }

  doRefresh(event){
    this.eventRefesh = event;
    this.getMovements(688)
    this.eventRefesh.target.complete();
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
