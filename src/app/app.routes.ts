import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { pages } from './core/environment/pages';

export const routes: Routes = [
    { path: '', redirectTo:  '/home', pathMatch: 'full' },
    { path: pages.HOME, component: HomeComponent, title: 'SkyCast-Home' },
    {path:'**', component:NotFoundComponent, title:'SkyCast-NotFound'}
];
