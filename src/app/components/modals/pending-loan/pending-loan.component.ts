import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-loan',
  templateUrl: './pending-loan.component.html',
  styleUrls: ['./pending-loan.component.scss'],
})
export class PendingLoanComponent implements OnInit {
  @Input() payment: any;
  constructor() { }

  dateCurrent = new Date();
  ngOnInit() {}

}
