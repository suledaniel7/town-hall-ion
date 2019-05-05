import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AddressProvider } from '../address/address';

@Injectable()
export class SignupProvider {
    api: string;

    constructor(public http: HttpClient, public address: AddressProvider) {
        this.api = this.address.getApi();
    }

    u_check(username): Observable<any> {
        return this.http.get(`${this.api}/users/check/` + username);
    }

    e_check(email): Observable<any> {
        return this.http.get(`${this.api}/users/checkEmail/` + email);
    }

    c_check(email): Observable<any> {
        return this.http.get(`${this.api}/users/checkCorrEmail/` + email);
    }

    i_check(v_id): Observable<any> {
        return this.http.get(`${this.api}/users/checkVId/` + v_id);
    }

    load_states(): Observable<any> {
        return this.http.get(`${this.api}/users/signup`);
    }

    load_districts(state_key): Observable<any> {
        return this.http.get(`${this.api}/users/signup/districts/` + state_key);
    }

    signup_o(name, username, email, email_corr, password, id): Observable<any> {
        return this.http.post(`${this.api}/organisations/signup`, {
            name: name,
            username: username,
            email: email,
            email_corr: email_corr,
            password: password,
            id: id
        });
    }

    signup_j(f_name, l_name, username, email, password, ac_type): Observable<any> {
        return this.http.post(`${this.api}/journalists/signup`, {
            f_name: f_name,
            l_name: l_name,
            username: username,
            email: email,
            password: password,
            ac_type: ac_type
        });
    }

    signup_u(f_name, username, email, password, gender, sen_dist, fed_const, v_id): Observable<any> {
        return this.http.post(`${this.api}/users/signup`, {
            f_name: f_name,
            username: username,
            email: email,
            password: password,
            gender: gender,
            sen_dist: sen_dist,
            fed_const: fed_const,
            v_id: v_id
        });
    }

    update_bio(bio: string): Observable<any> {
        return this.http.post(`${this.api}/set-bio`, { bio: bio });
    }
}
