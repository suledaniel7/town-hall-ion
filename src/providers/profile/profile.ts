import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class ProfileProvider {

    constructor(public http: HttpClient) {

    }

    o_profile(): Observable<any>{
        return this.http.get('/server');
    }

    o_profile_h(): Observable<any>{
        return this.http.get('/server?pg=home');
    }

    o_profile_j(): Observable<any>{
        return this.http.get('/server?pg=journos');
    }

    o_profile_p(): Observable<any>{
        return this.http.get('/server?pg=profile');
    }

    o_profile_c(): Observable<any>{
        return this.http.get('/server?pg=compose');
    }

}
