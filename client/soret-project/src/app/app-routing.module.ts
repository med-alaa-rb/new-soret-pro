import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'trip-type',
    loadChildren: () => import('./pages/trip-type/trip-type.module').then( m => m.TripTypePageModule)
  },
  {
    path: 'user-path',
    loadChildren: () => import('./pages/user-path/user-path.module').then( m => m.UserPathPageModule)
  },
  {
    path: 'map-traject',
    loadChildren: () => import('./pages/map-traject/map-traject.module').then( m => m.MapTrajectPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
