import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    exports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class GlobalModules {

}