import { Routes } from '@angular/router';
import { ListContact } from '../features/contacts/components/list-contact/list-contact';
import { Home } from '../features/home/components/home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'contacts',
        component: ListContact
    }
];
