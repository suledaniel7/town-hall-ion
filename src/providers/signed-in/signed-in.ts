import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AddressProvider } from '../address/address';

@Injectable()
export class SignedInProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    isSignedIn():  Observable<any> {
        return this.http.get(`${this.api}/signed-in`);
    }

}
