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

    load_info(code: string): Observable<any> {
        return this.http.get(`${this.api}/l-leg-info/${code}`);
    }

    edit_render(code: string): Observable<any> {
        return this.http.post(`${this.api}/edit-leg-render`, {code: code});
    }

    edit_leg(name: string, title: string, desc: string, url: string, sponsors: Array<string>, leg_code: string): Observable<any> {
        return this.http.post(`${this.api}/edit-legislation`, {
            sponsors: sponsors,
            title: name,
            official_title: title,
            description: desc,
            text_link: url,
            leg_code: leg_code
        });
    }
    
    edit_leg_stat(code: string, status: string): Observable<any> {
        return this.http.post(`${this.api}/edit-leg-stat`, {code: code, status: status});
    }
}
