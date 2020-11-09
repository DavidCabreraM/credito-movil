import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-loan',
  templateUrl: './pending-loan.component.html',
  styleUrls: ['./pending-loan.component.scss'],
})
export class PendingLoanComponent implements OnInit {
  @Input() payment: any;
  constructor() { }
   
  plazo=""
  destino=""
  dateCurrent = new Date();
  ngOnInit() {
    this.plazo = this.payment.tipo_plazo
    this.destino = this.payment.proposito_description
    if(this.payment.proposito_description=="COMPRAR LOCAL O VEHICULO"){
      this.destino = "BUYLOCAL"
    }
    if(this.payment.proposito_description=="ADQUIRIR O COMPRAR MERCANCIA"){
      this.destino = "ACQUIREMERCHANDISE"
    }
    if(this.payment.proposito_description=="COMPRAR MAQUINARIA, EQUIPO O HERRAMIENTAS"){
      this.destino = "BUYMACHINERY"
    }
    if(this.payment.proposito_description=="PAGAR DEUDAS DEL NEGOCIO"){
      this.destino = "PAYDEBT"
    }
    if(this.payment.proposito_description=="OTRO FIN RELACIONADO"){
      this.destino = "ANOTHEREND"
    }
    if(this.payment.proposito_description=="FINES AJENOS AL NEGOCIO"){
      this.destino = "OUTSIDEBUSINESS"
    }

    if(this.payment.tipo_plazo=="Semanas"){
      this.plazo = "Weeks"
    }
    if(this.payment.tipo_plazo=="Catorcenas"){
      this.plazo = "FOURTEEN"
    }
    if(this.payment.tipo_plazo=="Meses"){
      this.plazo = "Months"
    }
  }
}
