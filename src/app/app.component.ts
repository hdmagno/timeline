import { Component, OnInit } from '@angular/core';

import { SapService } from './service/sap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  events: any[] = [
    { content: 'Ordered' },
    { content: 'Processing' },
    { content: 'Shipped' },
    { content: 'Delivered' }
  ];

  hasMore = true;

  id!: number;

  constructor(
    private sapService: SapService) { }

  ngOnInit(): void {
    this.getStatusFromSap();
  }

  getStatusFromSap() {
    this.sapService.getStatusSap(3)
      .subscribe({
        next: res => {
          this.checkStatus(res);
        }
      })
  }

  onButtonClick() {
    this.events = [
      { content: 'Ordered' },
      { content: 'Processing' },
      { content: 'Shipped' },
      { content: 'Delivered' }
    ]
    this.getStatusFromSap();
  }

  // checkStatus(events: any[]) {
  //   if (events.length) {
  //     for (let i = 0; i < events.length; i++) {
  //       this.events[i].date = events[i].date;
  //       this.events[i].status = "P";
  //     }
  //     this.events[events.length - 1].status = 'A';
  //   }
  // }

  // checkStatus(events: any[]) {
  //   let hasPreviousA = false;

  //   for (let i = 0; i < events.length; i++) {
  //     this.events[i].date = events[i].date;

  //     if (hasPreviousA) {
  //       this.events[i].status = 'P';

  //       if (i === events.length - 2) {
  //         this.events[i + 1].status = 'A';
  //       }
  //     } else {
  //       this.events[i].status = 'P';
  //     }

  //     if (events[i].status === 'A') {
  //       hasPreviousA = true;
  //     }
  //   }

  //   if (!hasPreviousA && events.length > 0) {
  //     // se nenhum elemento anterior tiver o status 'A', adicione-o ao último elemento do array
  //     this.events[events.length - 1].status = 'A';
  //   }
  // }

  // checkStatus(events: any[]) {
  //   let hasPreviousA = false;
  //   let previousAIndex = -1;

  //   for (let i = 0; i < events.length; i++) {
  //     this.events[i].date = events[i].date;

  //     if (hasPreviousA) {
  //       this.events[i].status = 'P';

  //       if (i === previousAIndex + 1) {
  //         // se o elemento atual é o próximo depois do elemento que recebeu o status 'A',
  //         // adicione o status 'A' novamente
  //         this.events[i].status = 'A';
  //         hasPreviousA = true;
  //         previousAIndex = i;
  //       }
  //     } else {
  //       this.events[i].status = 'P';
  //     }

  //     if (events[i].status === 'A') {
  //       hasPreviousA = true;
  //       previousAIndex = i;
  //     }
  //   }

  //   if (!hasPreviousA && events.length > 0) {
  //     this.events[events.length - 1].status = 'A';
  //   }
  // }

  // checkStatus(events: any[]) {
  //   let previousAIndex = -1;

  //   // verifica se algum elemento anterior já tem o status 'A' e, se tiver,
  //   // remove o status 'A' de todos os elementos posteriores até o elemento anterior
  //   for (let i = 0; i < events.length; i++) {
  //     if (previousAIndex !== -1 && i > previousAIndex) {
  //       this.events[i].status = '';
  //     }

  //     if (events[i].status === 'A') {
  //       previousAIndex = i;
  //     }
  //   }

  //   // define todos os elementos para o status 'P' inicialmente
  //   for (let i = 0; i < events.length; i++) {
  //     this.events[i].date = events[i].date;
  //     this.events[i].status = 'P';
  //   }

  //   if (events.length > 0) {
  //     // adiciona o status 'A' ao último elemento do array
  //     this.events[events.length - 1].status = 'A';
  //   }
  // }

  checkStatus(events: any[]) {
    let copyEvents = [...this.events];
    let previousAIndex = -1;

    // verifica se algum elemento anterior já tem o status 'A' e, se tiver,
    // remove o status 'A' de todos os elementos posteriores até o elemento anterior
    for (let i = 0; i < events.length; i++) {
      if (previousAIndex !== -1 && i > previousAIndex) {
        this.events[i].status = '';
      }

      if (events[i].status === 'A') {
        previousAIndex = i;
      }
    }

    // define todos os elementos para o status 'P' inicialmente
    for (let i = 0; i < events.length; i++) {
      this.events[i].date = events[i].date;
      this.events[i].status = 'P';
    }

    if (events.length > 0) {
      // adiciona o status 'A' ao último elemento do array
      this.events[events.length - 1].status = 'A';
    }
  }
}
