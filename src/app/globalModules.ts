import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { JwtInterceptor } from "./services/jwtinterceptor";

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
    exports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
})
export class GlobalModules {

}