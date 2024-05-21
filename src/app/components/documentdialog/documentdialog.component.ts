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
import { MatFormField } from '@angular/material/form-field';
import { DocumentService } from '../../services/document.service';
@Component({
  selector: 'app-documentdialog',
  standalone: true,
  imports: [GlobalModules, MatDialogContent, MatDialogActions, MatDialogClose, FileUploaderComponent],
  templateUrl: './documentdialog.component.html',
  styleUrl: './documentdialog.component.css'
})
export class DocumentdialogComponent {
  categorySelected() {
    const arr = this.selectedCategoryValues.value

    Array.prototype.map(function (v, i, arr) {
      console.log(v)
    })
  }

  categoryList!: Category[]
  documentUpdateForm!: FormGroup;
  selectedCategoryId: any;
  selectedCategoryValues = new FormControl('');
  selectedCategoryNames!: Document[];
  constructor(public dialogRef: MatDialogRef<DocumentdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public document: Document, private documentService: DocumentService, private categoryService: CategoryService) {

    this.documentUpdateForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      selectedCategoryId: new FormControl()
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GetCategories().subscribe(result => {
      this.categoryList = result;
      this.documentUpdateForm.patchValue(this.document)
    })
  }

  savedDocumentFilePath(uploadedDocumentFilePath: string) {
    this.document.filePath = uploadedDocumentFilePath;
    console.log('this.singleDocument.filePath')
    console.log(this.document.filePath)
  }


  GetCategories() {
    return this.categoryService.GetCategories()
  }

  upsertDocument() {
    console.log('tetikledi,')
    var newDocumentValues: Document = this.documentUpdateForm.value
    this.document.id = newDocumentValues.id
    this.document.title = newDocumentValues.title
    this.document.description = newDocumentValues.description
    this.selectedCategoryId = this.documentUpdateForm.controls['selectedCategoryId']?.value
    if (!this.document.categories) this.document.categories = []
    if (this.selectedCategoryId)
      this.document.categories.push({ id: this.selectedCategoryId } as Category)

    console.log(this.document)
    if (this.document.id)
      this.documentService.UpdateDocument(this.document)
    else
      this.documentService.CreateDocument(this.document)
  }

  onNoClick() {
    this.dialogRef.close()
  }

}
