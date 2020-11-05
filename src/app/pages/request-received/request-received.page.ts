import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-received',
  templateUrl: './request-received.page.html',
  styleUrls: ['./request-received.page.scss'],
})
export class RequestReceivedPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onHome(){
    this.router.navigate(['/Home']);
  }

}
