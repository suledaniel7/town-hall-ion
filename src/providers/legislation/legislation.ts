import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class LegislationProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    load_legs(): Observable<any> {
        return this.http.get(`${this.api}/serve-legislators`);
    }

    create_bill(name: string, title: string, desc: string, url: string, sponsors: Array<string>): Observable<any> {
        return this.http.post(`${this.api}/create-legislation`, {
            sponsors: sponsors,
            title: name,
            official_title: title,
            description: desc,
            text_link: url
        });
    }

    load_legislation(): Observable<any>{
        return this.http.get(`${this.api}/serve-legislation`);
    }
}
