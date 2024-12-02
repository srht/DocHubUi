import { Component, Inject } from '@angular/core';
import { GlobalModules } from '../../globalModules';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Document } from '../../models/document';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { DocumentService } from '../../services/document.service';
import { Tag } from '../../models/tag';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsHelper } from '../../services/matchipshelper';
@Component({
  selector: 'app-documentdialog',
  standalone: true,
  imports: [GlobalModules, MatDialogContent, MatChipsModule, MatIconModule, MatDialogActions, MatDialogClose, FileUploaderComponent],
  templateUrl: './documentdialog.component.html',
  styleUrl: './documentdialog.component.css'
})
export class DocumentdialogComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  categoryList!: Category[]
  tagList: Tag[] = []
  documentUpdateForm!: FormGroup;
  selectedCategoriesArray: Category[] = []
  categories = new FormControl()
  tags = new FormControl()
  matchipHelper: MatChipsHelper;
  constructor(public dialogRef: MatDialogRef<DocumentdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public document: Document, private documentService: DocumentService, private categoryService: CategoryService) {

    this.documentUpdateForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl()
    })

    this.matchipHelper = new MatChipsHelper()
    document.tags=[]
    this.tagList = document?.tags
    this.matchipHelper.tagList = this.tagList;
    console.log(this.tagList)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.GetCategories().subscribe(result => {
      this.categoryList = result;
      this.documentUpdateForm.patchValue(this.document);
      if (this.document) {
        let selectedCategoryIDs = this.document.categories?.map(r => r.id)
        this.tagList = this.document.tags
        console.log(selectedCategoryIDs)
        this.categories.patchValue(selectedCategoryIDs)
        this.tags.patchValue(this.tagList)
      }
      else {
        this.document = new Document()
      }

    })
  }

  categorySelected() {
    const selectedCategoryValues: number[] = this.documentUpdateForm.controls['selectedCategoryValues']?.value

    for (let index = 0; index < selectedCategoryValues.length; index++) {
      const id = selectedCategoryValues[index];
      const foundd = this.categoryList.find((doc) => doc.id == id);
      if (foundd)
        this.selectedCategoriesArray.push(foundd)
    }

  }

  savedDocumentFilePath(uploadedDocumentFilePath: string) {
    this.document.filePaths=[]
    this.document.filePaths.push({filePath:uploadedDocumentFilePath});
    console.log('this.singleDocument.filePath')
    console.log(this.document.filePaths)
  }


  GetCategories() {
    return this.categoryService.GetCategories()
  }

  upsertDocument() {
    console.log('tetikledi,')
    console.log(this.categories)
    var newDocumentValues: Document = this.documentUpdateForm.value
    this.document.id = newDocumentValues.id
    this.document.title = newDocumentValues.title
    this.document.description = newDocumentValues.description
    this.document.tags = []
    this.document.categories = []
    if (this.categories.value)
      this.categories.value.map((r: number) =>
        this.document.categories.push({ id: r })
      )

    this.matchipHelper.tagList?.map((tag: Tag) =>
      this.document.tags.push(tag)
    )

    console.log(this.document)
    if (this.document.id)
      this.documentService.UpdateDocument(this.document)
    else
      this.documentService.CreateDocument(this.document)
  }

  chipAdd(event$: MatChipInputEvent) {
    console.log(event$)
    this.matchipHelper.add(event$)
  }

  chipEdit(tag: Tag, event$: MatChipEditedEvent) {
    this.matchipHelper.edit(tag, event$)
  }

  chipRemove(tag: Tag) {
    this.matchipHelper.remove(tag)
  }

  onNoClick() {
    this.dialogRef.close()
  }

}
