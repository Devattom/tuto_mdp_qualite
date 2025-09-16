import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Contact } from '../../../../interface/Contact';
import { Contacts } from '../../services/contacts';
import { DisplayFrenchNumberPipe } from '../../../../tools/pipes/display-french-number-pipe';


@Component({
  selector: 'app-list-contact',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, DisplayFrenchNumberPipe],
  templateUrl: './list-contact.html',
  styleUrl: './list-contact.css'
})
export class ListContact implements OnInit, AfterViewInit {
  private readonly contactService = inject(Contacts);
  displayedColumns: string[] = ['lastname', 'firstname', 'company', 'address', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource<Contact>();

  ngOnInit(): void {
    console.log(this.dataSource)
    this.contactService.getContacts().subscribe({
      next: (response) => {
        this.dataSource.data = response
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contacts', err)
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
