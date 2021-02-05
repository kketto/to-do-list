import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/item/list-item.component';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GhostPipe } from './pipes/ghost.pipe';
import { PaginatorComponent } from './paginator/paginator.component';
import { FilterComponent } from './filters/filter.component';
import { InputModule } from './input/input.module';
import { registerLocaleData } from '@angular/common';
import localeKa from '@angular/common/locales/ka';

registerLocaleData(localeKa);

const ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: ':id',
        loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)
      }
    ]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    GhostPipe,
    PaginatorComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    InputModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ka' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
