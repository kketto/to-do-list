import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';
import { CommentComponent } from './comment/comment.component';
import { DetailComponent } from './detail.component';


const ROUTES: Route[] = [
    {
        path: '',
        component: DetailComponent
    },
];

@NgModule({
    declarations: [
        DetailComponent,
        CommentComponent
    ],
    imports: [
        CommonModule,
        InputModule,
        RouterModule.forChild(ROUTES),
    ],
})
export class DetailModule { }