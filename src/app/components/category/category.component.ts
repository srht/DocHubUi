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
  imports: [GlobalModules, MatTableModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoryList!: Category[];
  displayedColumns: string[] = ['cattable-buttons', 'cattable-title'];
  singleCategory!: Category
  categoryName!: string;
  parentCategoryId!: number;
  constructor(private categoryService: CategoryService, public dialog: MatDialog) {

  }

  GetCategories() {
    this.categoryService.GetCategories().subscribe(res => {
      this.categoryList = res;
    })
  }

  openDialogForm() {
    const dialogRef = this.dialog.open(CategorydialogComponent, {
      data: this.singleCategory,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.singleCategory = result;
      this.categoryService.refetchData().subscribe();
    });
  }

  UpsertCategory() {
    if (this.singleCategory.id)
      this.categoryService.UpdateCategory(this.singleCategory).subscribe(res => this.GetCategories());
    else
      this.categoryService.CreateCategory(this.singleCategory).subscribe(res => this.GetCategories());

    this.categoryService.fetchData().subscribe();
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
      this.singleCategory = {
        id: id,
        name: selectedCategory!.name ?? '',
        parent: selectedCategory?.parent
      };

      this.categoryName = this.singleCategory.name ?? ''
    }

    this.openDialogForm()
  }

  DeleteCategory(id: number) {
    this.categoryService.DeleteCategoryById(id).subscribe(res => this.GetCategories())
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // Eğer veri yüklenmemişse, veriyi çek



    this.categoryService.categoriesData$.subscribe({
      next: (response: Category[]) => {
        this.categoryList = response;
      },
      error:
        (error: any) => {
          console.error('Veri alma hatası:', error);
        }
    });

    this.categoryService.fetchData().subscribe();


  }
}
