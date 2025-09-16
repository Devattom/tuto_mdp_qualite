import { Routes } from '@angular/router';
import { ListContact } from '../features/contacts/components/list-contact/list-contact';

export const routes: Routes = [
    {
        path: 'contacts',
        component: ListContact
    }
];
