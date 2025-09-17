import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../../../interface/Contact';
import { Contacts } from '../../services/contacts';
import { DisplayFrenchNumberPipe } from '../../../../tools/pipes/display-french-number-pipe';
import { MatDialog } from '@angular/material/dialog';
import { ModalContactDetails } from '../modal-contact-details/modal-contact-details';

@Component({
  selector: 'app-list-contact',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, DisplayFrenchNumberPipe],
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
    this.contactService.getContacts().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contacts', err);
      },
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  openDialog(id: number): void {
    console.log('open modal');
    
    const contact = this.dataSource.data.find(contact => contact.id === id);
    const dialogRef = this.dialog.open(ModalContactDetails, {
      data: {
        id: contact?.id,
        lastname: contact?.lastname,
        firstname: contact?.firstname,
        company: contact?.company,
        address: contact?.address,
        phone: contact?.phone,
        email: contact?.email
      },
      width: '800px',
      panelClass: 'custom-panel'
    });
  }
}
