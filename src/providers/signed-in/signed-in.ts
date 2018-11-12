import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class SignedInProvider {

    constructor(public http: HttpClient) {

    }

    isSignedIn():  Observable<any> {
        return this.http.get('/server/signed-in');
    }

}
