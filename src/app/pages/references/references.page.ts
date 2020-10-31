import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LoansService } from '../../services/loans/loans.service';
import { EstablishmentsComponent } from '../../components/establishments/establishments.component';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-references',
  templateUrl: './references.page.html',
  styleUrls: ['./references.page.scss'],
})

export class ReferencesPage implements OnInit {
  public references: any;
  public segment: string;
  public titulo: string;
  public id: string;

  constructor(private serviceLoan: LoansService, 
    private popoverController: PopoverController,
    private router: Router,
    private storage: Storage) { 

    this.segment = 'reembolsos';
    this.titulo = 'REFERENCES';
  }

  ngOnInit() {
      this.serviceLoan.references().subscribe(data =>{
          this.references = data;
          console.log(data);
      });

  }

  onReferenceDetail(item: any){
    console.log(item);
     this.router.navigate(['/referencedetail/' + item.cadena_resultado_referencia + '/' + item.nombre + '/' + this.segment ]);
  }
/*
  async presentPopover(ev: any) {
      this.storage.set('reference', ev);

      const popover = await this.popoverController.create({
        component: EstablishmentsComponent,
        cssClass: 'popover-content',
        translucent: true
      });
      return await popover.present();

  }
*/
}
