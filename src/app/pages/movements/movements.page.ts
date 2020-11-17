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
  public img = {one: '/assets/img/cards/Tarjeta6.svg', two: '/assets/img/cards/Tarjeta7.svg'};
  @ViewChild(IonSlides) slides: IonSlides;
  arrayMovements: any;
  eventRefesh: any;
  public prestamos: any[];
  public proximosPagos: any;
  idDetatail: string;

  constructor(
    private serviceLoans: LoansService,
    private alertController: AlertController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private storage: Storage
    ) {
      this.storage.get('indexCard').then((val) => {
        this.idDetatail = val;
      });
  }

  ngOnInit() {
    
    this.storage.get('proximos').then((val) => {
      this.proximosPagos = val;
    });
    this.storage.get('dashboard').then((val) => {
      this.prestamos = JSON.parse(val);
      console.log(this.prestamos)
      this.getMovements(this.prestamos[this.idDetatail].prestamo_id)
    });
  }
  ngAfterViewInit(){ 
    this.storage.get('indexCard').then((val) => {
      this.idDetatail = val;
      setTimeout (() => {this.slides.slideTo(parseInt(this.idDetatail),250);}, 200);
    });
    
  }

  loanChanged() {
    //debe obtener el id del arreglo
    let index = this.slides.getActiveIndex().then( promise =>{
      this.getMovements(this.prestamos[promise].prestamo_id)
    });
  }

  doRefresh(event){
    this.eventRefesh = event;
    this.loanChanged();
    this.eventRefesh.target.complete();
  }

  getMovements(id){
    this.arrayMovements=null;
    //console.log(this.arrayMovements)
    this.serviceLoans.getMoviments(id).toPromise().then( response =>{
      //console.log("L: ",response.movs.length)
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

  async presentAlert(header,msj) {
    const alert = await this.alertController.create({
      header: header,
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
  }
}
