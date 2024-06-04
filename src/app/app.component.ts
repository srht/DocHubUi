import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavigationExtras, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MembertoolComponent } from './components/membertool.componanet';
import { DrawersidebarComponent } from './components/drawersidebar/drawersidebar.component';
import { CategoryService } from './services/category.service';
import { Category } from './models/category';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Document } from './models/document';
import { CategoriesTreeComponent } from './components/categoriestree/categoriestree.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CategoriesTreeComponent, FormsModule, MatInputModule, MatButtonModule, MatIconModule, DrawersidebarComponent, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MembertoolComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'DocHubUi';
  mobileQuery: MediaQueryList;
  categoryList!: Category[]
  searchModel!: ""
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private navRoute: Router, private categoryService: CategoryService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  updateSearch(evt: any) {
    //const url = new URL("");
    //url.searchParams.set("foo", "bar");
    //history.pushState({ "ds": "dfdsf" }, '', '/documents/list/?keyword=gsdss');
    // Parametreleri oluştur
    let navigationExtras: NavigationExtras = {
      queryParams: {
        keyword: this.searchModel
      }
    };

    // Yönlendirme
    this.navRoute.navigate(['/documents/list'], navigationExtras);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
