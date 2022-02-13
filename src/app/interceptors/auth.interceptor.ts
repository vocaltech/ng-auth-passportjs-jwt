import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //
        // get the id_token from the localStorage
        //
        const id_token = localStorage.getItem('id_token')

        //
        // if present, then clone the request and replace the original headers with
        // cloned headers, updated with the authorization
        //
        let authReq: HttpRequest<any>

        if (id_token) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', id_token)
            })

            // Clone the request and set the new header in one step.
            //const authReq = req.clone({ setHeaders: { Authorization: authToken } });

            // send cloned request with header to the next handler
            return next.handle(authReq)
        } else {
            return next.handle(req)
        }
    }
}