import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './components/pages/search/search-page.component';
import { ContactPageComponent } from './components/pages/contact/contact-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
];
