import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { Contact } from '../../../../interface/Contact';


@Component({
  selector: 'app-modal-contact-details',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
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
  contact: Contact = { ...this.data };

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    console.log('save', this.contact);
  
  }
}
