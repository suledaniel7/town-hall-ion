import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressProvider } from '../address/address';

@Injectable()
export class SettingsProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    render(): Observable<any> {
        return this.http.get(`${this.api}/settings`);
    }

    update_u(bio: string, f_name: string, username: string, email: string, password: string, n_pass: string, state: string, fed_const: string, sen_dist: string, gender: string, v_id: string): Observable<any> {
        return this.http.post(`${this.api}/update/u`, {
            bio: bio,
            f_name: f_name,
            username: username,
            email: email,
            password: password,
            n_pass: n_pass,
            state: state,
            fed_const: fed_const,
            sen_dist: sen_dist,
            gender: gender,
            v_id: v_id
        });
    }

    update_o(bio: string, name: string, username: string, email: string, pub_email: string, password: string, n_pass: string, ver: string): Observable<any>{
        return this.http.post(`${this.api}/update/o`, {
            bio: bio,
            name: name,
            username: username,
            email: email,
            pub_email: pub_email,
            password: password,
            n_pass: n_pass,
            ver: ver
        });
    }

    update_j(bio: string, f_name: string, l_name: string, username: string, email: string, password: string, n_pass: string, org: string, beat: string): Observable<any> {
        return this.http.post(`${this.api}/update/j`, {
            bio: bio,
            f_name: f_name,
            l_name: l_name,
            username: username,
            email: email,
            password: password,
            n_pass: n_pass,
            org: org,
            beat: beat
        });
    }

    update_l(bio: string, f_name: string, l_name: string, email: string, password: string, n_pass: string, gender: string): Observable<any> {
        return this.http.post(`${this.api}/update/l`, {
            bio: bio,
            f_name: f_name,
            l_name: l_name,
            email: email,
            password: password,
            n_pass: n_pass,
            gender: gender
        });
    }
}
