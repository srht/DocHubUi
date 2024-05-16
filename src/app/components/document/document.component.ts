import { Component } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  documentUpdateForm!: FormGroup
  constructor(private documentService: DocumentService) {
    this.singleDocument = new Document()
    this.getDocuments();
    this.documentUpdateForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    })
  }

  getDocuments() {
    this.documentService.GetDocuments().subscribe(res => this.documentList = res)
  }

  savedDocumentFilePath(uploadedDocumentFilePath: string) {
    this.singleDocument.filePath = uploadedDocumentFilePath;
    console.log('this.singleDocument.filePath')
    console.log(this.singleDocument.filePath)
  }

  updateDocument() {
    console.log('tetikledi,')
    var newDocumentValues: Document = this.documentUpdateForm.value
    this.singleDocument.title = newDocumentValues.title
    this.singleDocument.description = newDocumentValues.description
    console.log(this.singleDocument)
    this.documentService.SubmitDocument(this.singleDocument)
  }

  deleteDocument(id: string) {
    console.log(id)
    this.documentService.DeleteDocumentById(id)
  }
}
