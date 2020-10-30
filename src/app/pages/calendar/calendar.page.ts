import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentComponent } from '@components/modals/payment/payment.component';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CalendarService } from '@services/calendar/calendar.service';
import { CalendarComponent } from "ionic2-calendar";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit, AfterViewInit {
  constructor(
    private calendarService: CalendarService,
    private modalController: ModalController,
    private storage: Storage,
    private route: ActivatedRoute
    ) {
      //this.account=route.snapshot.paramMap.get("account");
      this.promiseAccount = this.storage.get('accountNumber');
    }

  @ViewChild(CalendarComponent) myCalendar:CalendarComponent;
  public img = {one: '/assets/img/cards/Tarjeta5.svg', two: '/assets/img/cards/Tarjeta3.svg', three: '/assets/img/cards/Tarjeta4.svg', };
  promiseAccount:any;
  dateSelect: any;
  eventSource = [];
  calendarData = {
    mode: 'month',
    currentDate: new Date()
  };
  payments:any;
  precio = 222222;
  nextP:any;
  selectEvent:any;
  ngOnInit() {
  }
  
  ngAfterViewInit(){
    this.promiseAccount.then((account) => {
      console.log(account)
      this.calendarService.calendar(account).toPromise().then( promise => {
        console.log(promise)
        this.payments = promise;
        this.storage.set('payments', JSON.stringify(this.payments));
        this.nextPayment()
      })
    });
  }

  back(){
    let swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    let swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
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
          console.log("Es el menor: ", this.payments[i])
          this.nextP = this.payments[i]
          this.selectEvent = this.nextP;
          this.storage.set('nextP', JSON.stringify(this.nextP));
        }
        if(this.nextP >= f1){
          console.log("Es el menor: ", this.payments[i])
          this.nextP = this.payments[i]
          this.selectEvent = this.nextP;
          this.storage.set('nextP', JSON.stringify(this.nextP));
        }
      }
    }
    this.myCalendar.loadEvents();
  }

  selectPayment(payment){
    if(payment.pagado || payment.periodo==0){
      this.presentModal(payment);
    }else{
      this.selectEvent = payment;
    }
  }

  //Eventos del calendario
  onCurrentDateChanged(eve){
    this.dateSelect = eve;
    console.log("cambio fecha: ", eve)
  }

  reloadSource(){
    console.log("nose2")
  }

  onEventSelected(){
    console.log("Apreto")
  }

  onViewTitleChanged(){
    console.log("title")
  }

  onTimeSelected(eve){
    console.log(eve)
    if(eve.events.length > 0){
      this.selectPayment(eve.events[0].payment);
    }
  }

  async presentModal(data) {
    const modal = await this.modalController.create({
      component: PaymentComponent,
      componentProps: {
        'payment': data,
        'periodoTotal': this.payments.length,
        'nextP': this.nextP
      },
      cssClass: "size-modal"
    });
    return await modal.present();
  }
}
