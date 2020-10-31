import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applyfor-loan',
  templateUrl: './applyfor-loan.page.html',
  styleUrls: ['./applyfor-loan.page.scss'],
})
export class ApplyforLoanPage implements OnInit {
  public titulo: string;
  public amount: string = '500.00';
  constructor() {
    this.titulo = 'APPLYLOAN';
   }

  ngOnInit() {
  }

  rangeChange(even:any){
      console.log(even.detail.value.upper);
      this.amount = even.detail.value.upper + '.00';
  }

}
