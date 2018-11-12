import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class SigninProvider {

    constructor(public http: HttpClient) {
        
    }

    signinUser(email, password): Observable<any> {
        return this.http.post('/server/signin', {email: email, password: password});
    }

    // signinOrg(email, password): Observable<any> {
    //     return this.http.post('/server/organisations/signin', {email: email, password: password});
    // }

    // signinJ(email, password): Observable<any> {
    //     return this.http.post('/server/journalists/signin', {email: email, password: password});
    // }

    // signinL(email, password): Observable<any> {
    //     return this.http.post('/server/legislators/signin', {email: email, password: password});
    // }
}
