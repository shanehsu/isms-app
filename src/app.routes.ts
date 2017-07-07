import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

let routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full'},
  { path: '**', redirectTo: 'news' }
];

export const appRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)
