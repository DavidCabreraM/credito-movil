import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-referencedetail',
  templateUrl: './referencedetail.page.html',
  styleUrls: ['./referencedetail.page.scss'],
})
export class ReferencedetailPage implements OnInit {
  public titulo: string;
  public account: string;
  public reference: string;
  public segment: string;
  constructor( private route: ActivatedRoute) { 
    this.titulo = 'REFERENCES';
   }

  ngOnInit() {
    this.account = this.route.snapshot.paramMap.get('id');
    this.reference = this.route.snapshot.paramMap.get('reference');
    this.segment = this.route.snapshot.paramMap.get('segment');
    if(this.segment === 'reembolsos'){
      this.segment = 'REEMBOLSO';
    }
    console.log(this.segment);
    console.log(this.reference);
    
  }

}
