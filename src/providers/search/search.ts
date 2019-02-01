import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AddressProvider } from '../address/address';

@Injectable()
export class SearchProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    autofill(term: string): Observable<any>{
        return this.http.post(`${this.api}/autofill`, {term: term});
    }

    search(type: string, term: string): Observable<any>{
        return this.http.get(`${this.api}/search/${type}/${term}`);
    }

    load_trends(): Observable<any>{
        return this.http.post(`${this.api}/request-trends`, {});
    }

}
