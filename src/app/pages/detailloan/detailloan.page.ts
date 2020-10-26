import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

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
  public vencido_desde:string;
  public abono_capital: number;
  
  constructor(private storage: Storage,
    private translate: TranslateService,
    private route: ActivatedRoute) {
    this.segment = 'Crédito';
    this.titulo = 'LOANDETAIL';
   }

  ngOnInit() {
    this.parameter = this.route.snapshot.paramMap.get('id');

    this.storage.get('dashboard').then((val) => {
      let resul = JSON.parse(val);

      this.data = resul[this.parameter];
      this.onCargarData();
  });

  }

  onCargarData(){
    this.account_no = this.data.account_no;
    this.atrasado = this.data.atrasado;
    this.cuota = this.data.cuota;
    this.monto_original = this.data.monto_original;
    this.nombre_producto = this.data.nombre_producto;
    this.plazo = this.data.plazo;
    this.tipo_plazo = this.data.tipo_plazo;
    this.vencido_desde = this.data.vencido_desde;
    this.saldo_vencido = this.data.saldo_vencido;
    this.saldo_total = this.data.saldo_total;
    this.abono_capital = this.data.monto_original - this.data.saldo_total;
    /*if(this.data.monto_original === this.data.saldo_total){
      this.abono_capital = this.data.monto_original;
      this.saldo_total = this.data.monto_original - this.data.saldo_total;
    } else {
      this.abono_capital = this.data.monto_original - this.data.saldo_total;
    }*/
    
  }

  onTipoPlazo(){

  }

}
