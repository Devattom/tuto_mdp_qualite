import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../../../interface/Contact';
import { Contacts } from '../../services/contacts';
import { DisplayFrenchNumberPipe } from '../../../../tools/pipes/display-french-number-pipe';
import { MatDialog } from '@angular/material/dialog';
import { ModalContactDetails } from '../modal-contact-details/modal-contact-details';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-list-contact',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, DisplayFrenchNumberPipe, MatButtonModule],
  templateUrl: './list-contact.html',
  styleUrl: './list-contact.css',
})
export class ListContact implements OnInit, AfterViewInit {
  private readonly contactService = inject(Contacts);
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'lastname',
    'firstname',
    'company',
    'address',
    'phone',
    'email',
    'actions',
  ];
  dataSource = new MatTableDataSource<Contact>();

  ngOnInit(): void {
    this.getContacts();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getContacts() {
    this.contactService.getContacts().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contacts', err);
      },
    });
  }

  deleteContact(id: number): void {
    if (!confirm(`Êtes-vous sur de vouloir supprimer le contact ${id} ?`)) {
      return;
    }

    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter((contact) => contact.id !== id);
      },
      error: (err) => console.error('Erreur lors de suppression du contact', err),
    });
  }

  openDialog(id: number | null): void {
    const isCreation = id === null;
    const contact = isCreation ? null : this.dataSource.data.find(contact => contact.id === id);
    const dialogRef = this.dialog.open(ModalContactDetails, {
      data: {
        contact: {
          id: contact?.id ?? null,
          lastname: contact?.lastname ?? null,
          firstname: contact?.firstname ?? null,
          company: contact?.company ?? null,
          address: contact?.address ?? null,
          phone: contact?.phone ?? null,
          email: contact?.email ?? null,
        },
        isCreation
      }
    });

    dialogRef.afterClosed().subscribe((updatedContact: Contact | undefined) => {
      if (updatedContact) {
        if(isCreation) {
          this.dataSource.data = [updatedContact, ...this.dataSource.data];
        } else {
          const index = this.dataSource.data.findIndex(contact => contact.id === updatedContact.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedContact;
            this.dataSource.data = [...this.dataSource.data]
          }
        }
      }
    })
  }
}
