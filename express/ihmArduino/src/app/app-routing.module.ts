import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { NeopixelsComponent } from './components/neopixels/neopixels.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'sensor', component: SensorsComponent
  },
  {
    path: 'customlight', component: NeopixelsComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**', component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
