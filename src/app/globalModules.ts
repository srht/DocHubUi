import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
    exports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class GlobalModules {

}