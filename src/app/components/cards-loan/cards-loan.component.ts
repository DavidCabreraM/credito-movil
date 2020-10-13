import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards-loan',
  templateUrl: './cards-loan.component.html',
  styleUrls: ['./cards-loan.component.scss'],
})
export class CardsLoanComponent implements OnInit, AfterViewInit {

  @Input() id: number;

  @ViewChild(IonSlides) slides: IonSlides;
  public dashboard:any;
  public prestamos: any[];

  public img = {one: '/assets/img/cards/Tarjeta1.svg', two: '/assets/img/cards/Tarjeta2.svg'};

  sliderConfig = {
    slidesPerView: 1.2,
    spaceBetween: .3,
    centeredSlides: true
  };
 
  public key: string = 'indexCard';
  
  constructor(private storage: Storage,  private router: Router) { }

  ngOnInit() {
    
    this.storage.get('dashboard').then((val) => {
    this.prestamos = JSON.parse(val).prestamos;
    console.log(this.prestamos);
    });

    if(this.prestamos == null){
      this.prestamos = [
        {
          prestamo_account_no: '000000000',
          saldo_total: 0,
          monto_proximo_pago: 0,
          fecha_proximo_pago: new Date()
        }
      ];
    }
      

   }


  onAccounts(id: number){
    //this.storage.remove(this.key);
    this.storage.set(this.key, JSON.stringify(id));
    
    this.router.navigate(['/account/', id]);
  }

  ngAfterViewInit(){
    this.slides.slideTo(this.id);
  }


}
