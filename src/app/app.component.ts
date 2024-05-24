import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterModule, RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CategoriesTreeComponent, MatButtonModule, MatIconModule, DrawersidebarComponent, RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MembertoolComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DocHubUi';
  mobileQuery: MediaQueryList;
  categoryList!: Category[]
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private categoryService: CategoryService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
