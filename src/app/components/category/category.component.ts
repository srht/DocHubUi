import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { GlobalModules } from '../../globalModules';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategorydialogComponent } from '../categorydialog/categorydialog.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [GlobalModules,MatTableModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryList!: Category[];
  displayedColumns: string[] = ['cattable-buttons', 'cattable-title'];
  singleCategory!: Category
  categoryName!: string;
  parentCategoryId!: number;
  constructor(private categoryService: CategoryService,public dialog: MatDialog) {
    this.GetCategories()
  }

  GetCategories() {
    this.categoryService.GetCategories().subscribe(res =>{ 
      this.categoryList = res;
  })
  }

  openDialogForm(){
    const dialogRef = this.dialog.open(CategorydialogComponent, {
      data: this.singleCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.singleCategory = result;
    });
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

  SelectCategory(id: number) {
    let selectedCategory = this.categoryList.find(i => i.id === id);
    if (selectedCategory !== null) {
      this.singleCategory={
        id:id,
        name : selectedCategory!.name ?? ''
      };
      
      this.categoryName = this.singleCategory.name ?? ''
    }

    this.openDialogForm()
  }

  DeleteCategory(id: number) {
    this.categoryService.DeleteCategoryById(id).subscribe(res => this.GetCategories())
  }

}
