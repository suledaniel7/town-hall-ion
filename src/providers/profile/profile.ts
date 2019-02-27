import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AddressProvider } from '../address/address';

@Injectable()
export class ProfileProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    u_profile_h(): Observable<any> {
        return this.http.get(`${this.api}/?pg=home`);
    }

    u_profile_p(): Observable<any> {
        return this.http.get(`${this.api}/?pg=profile`);
    }

    j_profile_v(): Observable<any> {
        return this.http.get(`${this.api}/?pg=verify`);
    }

    j_profile_h(): Observable<any> {
        return this.http.get(`${this.api}/?pg=home`);
    }

    j_profile_o(): Observable<any> {
        return this.http.get(`${this.api}/?pg=org`);
    }

    j_profile_p(): Observable<any> {
        return this.http.get(`${this.api}/?pg=profile`);
    }

    o_profile(): Observable<any> {
        return this.http.get(`${this.api}`);
    }

    o_profile_r(): Observable<any> {
        return this.http.get(`${this.api}/?pg=root`);
    }

    o_profile_h(): Observable<any> {
        return this.http.get(`${this.api}/?pg=home`);
    }

    o_profile_j(): Observable<any> {
        return this.http.get(`${this.api}/?pg=journos`);
    }

    o_profile_p(): Observable<any> {
        return this.http.get(`${this.api}/?pg=profile`);
    }

    o_profile_c(): Observable<any> {
        return this.http.get(`${this.api}/?pg=compose`);
    }

    l_profile_h(): Observable<any> {
        return this.http.get(`${this.api}/?pg=home`);
    }

    l_profile_p(): Observable<any> {
        return this.http.get(`${this.api}/?pg=profile`);
    }

}
