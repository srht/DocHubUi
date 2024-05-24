import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-categoriestree',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './categoriestree.component.html',
  styleUrl: './categoriestree.component.css'
})
export class CategoriesTreeComponent {
  treeControl = new NestedTreeControl<Category>(node => node.subCategories);
  dataSource = new MatTreeNestedDataSource<Category>();
  categoryList!: Category[];
  constructor(private categoryService: CategoryService) {
    this.categoryService.GetCategories().subscribe(res => {
      this.dataSource.data = res;
    })

  }

  hasChild = (_: number, node: Category) => !!node.subCategories && node.subCategories.length > 0;

}
