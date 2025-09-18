import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Contact } from '../../../interface/Contact';
import { ContactResponse } from '../../../interface/ContactResponse';
import { DeleteResponse } from '../../../interface/DeleteResponse';
import { UpdateResponse } from '../../../interface/UpdateResponse';
import { CreateResponse } from '../../../interface/CreateResponse';

@Injectable({
  providedIn: 'root'
})
export class Contacts {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/contacts'

  getContacts(search: string|null = null): Observable<Contact[]> {
    let params = new HttpParams();

    if (search !== null) {
      params = params.set('lastname', search);
    }
    
    return this.http.get<ContactResponse>(this.baseUrl, { params }).pipe(
      map(response => response.data)
    );
  }

  deleteContact(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(this.baseUrl + '/' + id);
  }

  update(contact: Contact): Observable<UpdateResponse> {
    return this.http.put<UpdateResponse>(this.baseUrl + '/' + contact.id, contact);
  }

  create(contact: Contact): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(this.baseUrl, contact);
  }
}
