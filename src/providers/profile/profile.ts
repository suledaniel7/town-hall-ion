import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class ProfileProvider {

    constructor(public http: HttpClient) {

    }

    u_profile_h(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=home');
    }

    u_profile_p(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=profile');
    }

    j_profile_v(): Observable<any> {
        return this.http.get('http://127.169.43.55:8095/api/?pg=verify');
    }

    j_profile_h(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=home');
    }

    j_profile_o(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=org');
    }

    j_profile_p(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=profile');
    }

    o_profile(): Observable<any>{
        return this.http.get('/server');
    }

    o_profile_h(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=home');
    }

    o_profile_j(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=journos');
    }

    o_profile_p(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=profile');
    }

    o_profile_c(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=compose');
    }

    l_profile_h(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=home');
    }

    l_profile_p(): Observable<any>{
        return this.http.get('http://127.169.43.55:8095/api/?pg=profile');
    }

}
