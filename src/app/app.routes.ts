import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
      showInNavBar: true,
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
