import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '',  redirectTo:'Home', pathMatch: 'full' },  
  { path: 'Home',  loadChildren: 'app/home/home.module#HomeModule'},
  { path: 'Desplegable',  loadChildren: 'app/desplegable/desplegable.module#DesplegableModule'},
  { path: 'Tarea',  loadChildren: 'app/tarea/tarea.module#TareaModule'},
  { path: 'User',  loadChildren: 'app/user/user.module#UserModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule {}