import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AddressProvider } from '../address/address';

@Injectable()
export class JAccountProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    j_beat_render(): Observable<any> {
        return this.http.get(`${this.api}/journalists/beats/`);
    }

    j_org_render(): Observable<any> {
        return this.http.get(`${this.api}/journalists/orgs/`);
    }

    j_beat_sub(beat): Observable<any> {
        return this.http.post(`${this.api}/select-beat`, {beat: beat});
    }

    j_org_sub(org): Observable<any> {
        return this.http.post(`${this.api}/organisations/request`, {organisation: org});
    }

    reason(): Observable<any> {
        return this.http.post(`${this.api}/rejection`, {});
    }

    status(): Observable<any> {
        return this.http.get(`${this.api}/j-stat`);
    }
}
