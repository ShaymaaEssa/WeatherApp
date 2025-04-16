import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo:  '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'SkyCast-Home' },
    {path:'**', component:NotFoundComponent, title:'SkyCast-NotFound'}
];
