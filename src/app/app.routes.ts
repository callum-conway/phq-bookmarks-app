import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        title: 'Home Page',
    },
    {
        path: 'results',
        component: ResultsPageComponent,
        title: 'Results Page',
    }
];
