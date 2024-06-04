import { Injectable } from "@angular/core";
import { Category } from "../models/category";
import { CategoryService } from "../services/category.service";

@Injectable({
    providedIn: 'root'
})
export class CategoriesFetch {
    categoriesData!: Category[]
    constructor(private categoriesService: CategoryService) {
        this.categoriesService.categoriesData$.subscribe(
            (response) => {
                this.categoriesData = response;
            },
            (error) => {
                console.error('Veri alma hatası:', error);
            }
        );

        // Eğer veri yüklenmemişse, veriyi çek
        this.categoriesService.fetchData().subscribe();
    }
}
