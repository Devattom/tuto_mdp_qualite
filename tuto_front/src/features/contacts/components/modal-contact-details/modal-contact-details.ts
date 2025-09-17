import { Component, EventEmitter, inject, model, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { Contact } from '../../../../interface/Contact';
import { Contacts } from '../../services/contacts';


@Component({
  selector: 'app-modal-contact-details',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './modal-contact-details.html',
  styleUrl: './modal-contact-details.css'
})
export class ModalContactDetails {
  readonly dialogRef = inject(MatDialogRef<ModalContactDetails>);
  readonly data = inject<Contact>(MAT_DIALOG_DATA);
  private readonly contactService = inject(Contacts)
  contact: Contact = { ...this.data };
  contactErrors: string = '';

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log(this.contact);
    
    if (this.contact.lastname === '') {
      this.contactErrors = 'Le nom est obligatoire'
      return;
    }

    this.contactService.update(this.contact).subscribe({
      next: (response) => {
        console.log(response.contact);
        
        this.dialogRef.close(response.contact);
      },
      error: (error) => console.error('Erreur lors de la modification', error)
    });
  }
}
