import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class SignupProvider {

    constructor(public http: HttpClient) {
        
    }

    u_check(username): Observable<any>{
        return this.http.get('/server/users/check/'+username);
    }

    e_check(email): Observable<any>{
        return this.http.get('/server/users/checkEmail/'+email);
    }

    c_check(email): Observable<any>{
        return this.http.get('/server/users/checkCorrEmail/'+email);
    }

    load_states(): Observable<any> {
        return this.http.get('/server/users/signup');
    }

    load_districts(state_key): Observable<any> {
        return this.http.get('/server/users/signup/districts/'+state_key);
    }

    signup_o(name, username, email, email_corr, password, id): Observable<any>{
        return this.http.post('/server/organisations/signup', {
            name: name,
            username: username,
            email: email,
            email_corr: email_corr,
            password: password,
            id: id
        });
    }

    signup_j(f_name, l_name, username, email, password, ac_type): Observable<any>{
        return this.http.post('/server/journalists/signup', {
            f_name: f_name,
            l_name: l_name,
            username: username,
            email: email,
            password: password,
            ac_type: ac_type
        });
    }

    signup_u(f_name, username, email, password, gender, sen_dist, fed_const): Observable<any>{
        return this.http.post('/server/users/signup', {
            f_name: f_name,
            username: username,
            email: email,
            password: password,
            gender: gender,
            sen_dist: sen_dist,
            fed_const: fed_const
        });
    }

}
