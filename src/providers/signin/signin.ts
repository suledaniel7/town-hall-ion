import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class SigninProvider {

    constructor(public http: HttpClient) {
        
    }

    signinUser(email, password): Observable<any> {
        return this.http.post('http://127.169.43.55:8095/api/signin', {email: email, password: password});
    }
}
