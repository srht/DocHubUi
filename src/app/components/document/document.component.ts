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
import { ActivatedRoute } from '@angular/router';

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
  constructor(private activatedRoute: ActivatedRoute, private documentService: DocumentService, private categoryService: CategoryService, public dialog: MatDialog) {
    activatedRoute.queryParams.subscribe(p => {
      let kw = p["keyword"]
      this.getDocuments(kw)
    })
    this.singleDocument = new Document()

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

  getDocuments(keyword: string) {
    this.documentService.Search(keyword).subscribe(res => this.documentList = res)
  }

  GetCategories() {
    this.categoryService.GetCategories().subscribe(res => this.categoryList = res)
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
