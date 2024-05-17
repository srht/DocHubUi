import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [MatList, MatListItem, CommonModule, FormsModule, ReactiveFormsModule, FileUploaderComponent],
  templateUrl: './document.component.html',
  styleUrl: './document.component.css'
})
export class DocumentComponent {
  singleDocument!: Document
  documentList!: Document[]
  categoryList!: Category[]
  selectedCategoryId!: number
  documentUpdateForm!: FormGroup
  constructor(private documentService: DocumentService, private categoryService: CategoryService) {
    this.singleDocument = new Document()
    this.getDocuments();
    this.GetCategories();
    this.documentUpdateForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl()
    })
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
    console.log(this.singleDocument)
    if (this.singleDocument.id)
      this.documentService.UpdateDocument(this.singleDocument)
    else
      this.documentService.CreateDocument(this.singleDocument)
  }

  selectDocument(id: string) {
    let doc = this.documentList.find(i => i.id === id);
    if (doc) {
      this.singleDocument.id = doc.id
      this.singleDocument.title = doc.title
      this.singleDocument.description = doc.description
    }
    this.documentUpdateForm.setValue(this.singleDocument)
  }

  deleteDocument(id: string) {
    console.log(id)
    this.documentService.DeleteDocumentById(id)
  }
}
