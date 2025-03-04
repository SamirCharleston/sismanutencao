import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrar', component: RegistrarComponent }
];
