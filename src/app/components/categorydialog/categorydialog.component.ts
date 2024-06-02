import { Component, Inject } from '@angular/core';
import { Category } from '../../models/category';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { GlobalModules } from '../../globalModules';

@Component({
  selector: 'app-categorydialog',
  standalone: true,
  imports: [GlobalModules, FormsModule,MatDialogModule,MatSelectModule,MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './categorydialog.component.html',
  styleUrl: './categorydialog.component.css'
})
export class CategorydialogComponent {
  categoryList!: Category[]
  parentCategoryId!: number;
  categoryName!: string;
  categoryUpdateForm!: FormGroup;
  selectedCategoriesArray: Category[] = []
  categories = new FormControl()
  constructor(public dialogRef: MatDialogRef<CategorydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public singleCategory: Category, private categoryService: CategoryService) {

    this.GetCategories()
    this.categoryUpdateForm=new FormGroup({
      name:new FormControl(singleCategory.name),
      category:new FormControl(singleCategory.parent)
    })
  }

  GetCategories() {
    this.categoryService.GetCategories().subscribe(res => {
      this.categoryList = res;
    })
  }

  UpsertCategory() {
    if (this.singleCategory.id)
      this.categoryService.UpdateCategory(this.singleCategory).subscribe(res => this.GetCategories());
    else
      this.categoryService.CreateCategory(this.singleCategory).subscribe(res => this.GetCategories());
  }

  NewCategory() {
    let selectedParentCategory = this.categoryList.find(i => i.id == this.parentCategoryId);
    console.log('selectedParentCategory')
    console.log(selectedParentCategory)
    this.singleCategory.name = this.categoryName
    this.singleCategory.parent = selectedParentCategory!
    this.UpsertCategory()
  }

  UpdateCategory() {
    let selectedParentCategory = this.categoryList.find(i => i.id == this.parentCategoryId);
    console.log('selectedParentCategory')
    console.log(selectedParentCategory)
    this.singleCategory.name = this.categoryName
    this.singleCategory.parent = selectedParentCategory!
    this.UpsertCategory()
  }

  upsert(){
    if(this.singleCategory)
      this.UpdateCategory()
    else
    this.NewCategory()
  }

  onNoClick() {
    this.dialogRef.close()
  }

}
