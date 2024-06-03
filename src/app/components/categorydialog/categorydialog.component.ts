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
  imports: [GlobalModules, FormsModule, MatDialogModule, MatSelectModule, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './categorydialog.component.html',
  styleUrl: './categorydialog.component.css'
})
export class CategorydialogComponent {
  categoryList!: Category[]
  parentCategoryId!: number;
  categoryName!: string;
  categoryUpdateForm!: FormGroup;
  selectedCategoriesArray: Category[] = []
  selectedParentCategoryControl = new FormControl()
  selectedCategoryId: number | undefined;
  constructor(public dialogRef: MatDialogRef<CategorydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public singleCategory: Category, private categoryService: CategoryService) {

    this.GetCategories()
    this.categoryUpdateForm = new FormGroup({
      name: new FormControl(singleCategory?.name)
    })
    this.selectedCategoryId = this.singleCategory.parent?.id

  }

  GetCategories() {
    this.categoryService.GetCategories().subscribe(res => {
      this.categoryList = res;

    })
  }

  UpsertCategory() {
    let selectedParentCategory = this.categoryList.find(i => i.id == this.parentCategoryId);
    console.log('selectedParentCategory')
    console.log(selectedParentCategory)
    let formCategory = this.categoryUpdateForm.value;
    let processedCategory: Category = {
      id: this.singleCategory?.id,
      name: formCategory.name,
      parent: {
        id: this.selectedCategoryId
      }
    };

    debugger
    if (this.singleCategory?.id)
      this.categoryService.UpdateCategory(processedCategory).subscribe(res => this.GetCategories());
    else
      this.categoryService.CreateCategory(processedCategory).subscribe(res => this.GetCategories());
  }

  onNoClick() {
    this.dialogRef.close()
  }

}
