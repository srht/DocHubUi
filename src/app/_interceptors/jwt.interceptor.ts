import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  console.log('jwt test')
  const token = new AuthService().getToken();
  console.log('token')
  console.log(token)
  // Eğer token varsa, isteğe Authorization başlığını ekle
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
