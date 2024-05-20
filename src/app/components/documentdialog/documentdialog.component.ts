import { Component, Inject } from '@angular/core';
import { GlobalModules } from '../../globalModules';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Document } from '../../models/document';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-documentdialog',
  standalone: true,
  imports: [GlobalModules, MatDialogContent, MatDialogActions, MatDialogClose, FileUploaderComponent],
  templateUrl: './documentdialog.component.html',
  styleUrl: './documentdialog.component.css'
})
export class DocumentdialogComponent {
  upsertDocument() {
    throw new Error('Method not implemented.');
  }
  categoryList!: Category[]
  documentUpdateForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<DocumentdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public document: Document, private categoryService: CategoryService) {

    this.documentUpdateForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      selectedCategoryId: new FormControl()
    })
  }

  savedDocumentFilePath(uploadedDocumentFilePath: string) {
    this.document.filePath = uploadedDocumentFilePath;
    console.log('this.singleDocument.filePath')
    console.log(this.document.filePath)
  }


  GetCategories() {
    this.categoryService.GetCategories().subscribe(res => this.categoryList = res)
  }


  onNoClick() {
    this.dialogRef.close()
  }

}
