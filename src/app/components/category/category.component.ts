import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { GlobalModules } from '../../globalModules';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [GlobalModules],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryList!: Category[];
  singleCategory!: Category;
  categoryName!: string;
  parentCategoryId!: number;
  constructor(private categoryService: CategoryService) {
    this.GetCategories()
  }

  GetCategories() {
    this.categoryService.GetCategories().subscribe(res => this.categoryList = res)
  }

  UpsertCategory() {
    if (this.singleCategory.id)
      this.categoryService.UpdateCategory(this.singleCategory).subscribe(res => this.GetCategories());
    else
      this.categoryService.CreateCategory(this.singleCategory).subscribe(res => this.GetCategories());
  }

  NewCategory() {
    this.singleCategory = new Category()
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
      this.singleCategory = new Category()
      this.singleCategory.id = id;
      this.singleCategory.name = selectedCategory!.name
      this.categoryName = this.singleCategory.name
    }
  }

  DeleteCategory(id: number) {
    this.categoryService.DeleteCategoryById(id).subscribe(res => this.GetCategories())
  }

}
