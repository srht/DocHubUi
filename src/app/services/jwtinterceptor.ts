import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // JWT token'ını al
        const token = this.authService.getToken();
        console.log(token)
        // Eğer token varsa, isteğe Authorization başlığını ekle
        if (token) {
            request.headers.set('Authorization', token)
        }

        // Yeni işlenmiş isteği devam ettir
        return next.handle(request);
    }
}
