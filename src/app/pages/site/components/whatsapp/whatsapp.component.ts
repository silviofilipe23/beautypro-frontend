import { Component, OnInit } from '@angular/core';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent implements OnInit {
  showDiv = true;
  temporizadorWidget(): void {
    const timer$ = of(true).pipe(delay(3500));

    timer$.subscribe(() => {
      this.showDiv = false;
    });
  }

  constructor() {}

  ngOnInit() {
    this.temporizadorWidget();
  }

  whatsapp() {
    window.open('https://api.whatsapp.com/send/?phone=555192263846', '_new');
  }

  openSesiModal() {
    var el = document.getElementById('widget-box');
    var el2 = document.getElementById('widget-box-modal');

    el?.classList.toggle('hide');
    el2?.classList.toggle('hide');
  }

  abrirChatSesi() {
    var el = document.getElementById('icon-close');
    var el2 = document.getElementById('widget-chat');
    var el3 = document.getElementById('widget-box-modal');
    var el4 = document.getElementById('icon-chat');
    var el5 = document.getElementById('icon-modal');

    el?.classList.toggle('hide');
    el2?.classList.toggle('hide');
    el3?.classList.toggle('hide');
    el4?.classList.toggle('hide');
    el5?.classList.toggle('hide');
  }
  fecharchatSesi() {
    var el = document.getElementById('icon-close');
    var el2 = document.getElementById('widget-chat');
    var el3 = document.getElementById('widget-box-modal');
    var el4 = document.getElementById('icon-chat');
    var el5 = document.getElementById('icon-modal');

    el?.classList.toggle('hide');
    el2?.classList.toggle('hide');
    el3?.classList.toggle('hide');
    el4?.classList.toggle('hide');
    el5?.classList.toggle('hide');
  }
}
