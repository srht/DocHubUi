import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
    exports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule]
})
export class GlobalModules {

}