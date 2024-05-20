import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document';
import { MatList, MatListItem } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { MatDialog } from '@angular/material/dialog';
import { DocumentdialogComponent } from '../documentdialog/documentdialog.component';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatList, MatListItem, CommonModule, FormsModule, ReactiveFormsModule, FileUploaderComponent],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {
  singleDocument!: Document
  documentList!: Document[]
  displayedColumns: string[] = ['buttons', 'title'];
  categoryList!: Category[]
  selectedCategoryId!: number
  documentUpdateForm!: FormGroup
  constructor(private documentService: DocumentService, private categoryService: CategoryService, public dialog: MatDialog) {
    this.singleDocument = new Document()
    this.getDocuments();
    this.GetCategories();
    this.documentUpdateForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      selectedCategoryId: new FormControl()
    })
  }

  openEditDialog(document: Document) {
    const dialogRef = this.dialog.open(DocumentdialogComponent, {
      data: document,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.singleDocument = result;
    });
  }

  getDocuments() {
    this.documentService.GetDocuments().subscribe(res => this.documentList = res)
  }

  GetCategories() {
    this.categoryService.GetCategories().subscribe(res => this.categoryList = res)
  }

  savedDocumentFilePath(uploadedDocumentFilePath: string) {
    this.singleDocument.filePath = uploadedDocumentFilePath;
    console.log('this.singleDocument.filePath')
    console.log(this.singleDocument.filePath)
  }

  upsertDocument() {
    console.log('tetikledi,')
    var newDocumentValues: Document = this.documentUpdateForm.value
    this.singleDocument.id = newDocumentValues.id
    this.singleDocument.title = newDocumentValues.title
    this.singleDocument.description = newDocumentValues.description
    this.selectedCategoryId = this.documentUpdateForm.controls['selectedCategoryId']?.value
    if (!this.singleDocument.categories) this.singleDocument.categories = []
    if (this.selectedCategoryId)
      this.singleDocument.categories.push({ id: this.selectedCategoryId } as Category)

    console.log(this.singleDocument)
    if (this.singleDocument.id)
      this.documentService.UpdateDocument(this.singleDocument)
    else
      this.documentService.CreateDocument(this.singleDocument)
  }

  selectDocument(id: string) {
    let doc = this.documentList.find(i => i.id === id);

    if (doc) {
      this.singleDocument = new Document()
      this.singleDocument.id = doc.id
      this.singleDocument.title = doc.title
      this.singleDocument.description = doc.description
      this.singleDocument.categories = doc.categories && []
    }
    this.documentUpdateForm.patchValue(this.singleDocument)
    console.log(this.singleDocument)
    this.openEditDialog(this.singleDocument)
  }

  deleteDocument(id: string) {
    console.log(id)
    this.documentService.DeleteDocumentById(id)
  }
}
