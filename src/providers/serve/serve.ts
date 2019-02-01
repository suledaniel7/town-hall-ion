import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class ServeProvider {
    api: string;

    constructor(public http: HttpClient, private address: AddressProvider) {
        this.api = this.address.getApi();
    }

    serve_districts(): Observable<any> {
        return this.http.get(`${this.api}/serve-districts`);
    }
}
