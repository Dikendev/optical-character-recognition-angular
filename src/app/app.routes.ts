import { Routes } from '@angular/router';
import { ResponseComponent } from './pages/response/response.component';
import { HomeComponent } from './pages/home/home.component';

const data = {
  title: 'Home',
  showInNavBar: true,
};

export const routes: Routes = [
  {
    path: 'home',
    data: data,
    component: HomeComponent,
  },
  {
    path: 'response',
    data: {
      title: 'Response',
      showInNavBar: false,
    },
    component: ResponseComponent,
  },
  {
    path: '',
    data: {
      title: 'Home',
      showInNavBar: false,
    },
    component: HomeComponent,
  },
];
