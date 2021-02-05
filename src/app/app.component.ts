import { Component } from '@angular/core';

export interface Comment {
  text: string;
  createDate: Date;
}

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  comments?: Comment[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // ourEmitter = new EventEmitter();



  // constructor() {
  //   this.ourEmitter.subscribe((racDaiyvira) => {
  //     console.log('rac daiyvira', racDaiyvira)
  //   });

  //   this.ourEmitter.subscribe((racDaiyvira) => {
  //     console.log('rac daiyvira3', racDaiyvira)
  //   });
  //   this.ourEmitter.subscribe((racDaiyvira) => {
  //     console.log('rac daiyvira2', racDaiyvira)
  //   });
  // }

  // onDayvireba(): void {
  //   this.ourEmitter.emit('keti')
  // }
}
