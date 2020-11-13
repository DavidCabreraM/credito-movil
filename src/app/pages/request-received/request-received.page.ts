import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.page.html',
  styleUrls: ['./request-received.page.scss'],
})
export class RequestReceivedPage implements OnInit {

  constructor(private router: Router, private trasnlate: TranslateService) { }

  ngOnInit() {
  }
  onHome(){
    this.router.navigate(['/home']);
  }

}
