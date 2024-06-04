import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CategoriesFetch } from '../../helpers/categoryFetch';
@Component({
  selector: 'app-categoriestree',
  standalone: true,
  imports: [RouterModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './categoriestree.component.html',
  styleUrl: './categoriestree.component.css'
})
export class CategoriesTreeComponent implements OnInit {
  treeControl = new NestedTreeControl<Category>(node => node.subCategories);
  dataSource = new MatTreeNestedDataSource<Category>();
  categoryList!: Category[];
  constructor(private categoriesService: CategoryService, private activatedRoute: ActivatedRoute) {

  }

  hasChild = (_: number, node: Category) => !!node.subCategories && node.subCategories.length > 0;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoriesService.categoriesData$.subscribe({
      next: (response: Category[]) => {
        this.categoryList = response;
      },
      error:
        (error: any) => {
          console.error('Veri alma hatası:', error);
        }
    });

    // Eğer veri yüklenmemişse, veriyi çek
    this.categoriesService.fetchData().subscribe();

    this.activatedRoute.queryParams.subscribe(p => {
      this.dataSource.data = []
      let kw = p["keyword"]
      this.dataSource.data = kw ? this.categoryList?.filter(i => !i.name!.startsWith(kw)) : this.categoryList?.filter(i => !i.parent);
    })
  }

}
