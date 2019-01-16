import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RenderProvider {

    constructor(public http: HttpClient) {
        
    }

    render_profile(username: string): Observable<any> {
        return this.http.get(`http://127.169.43.55:8095/api/profile/${username}`);
    }

    follow(username: string): Observable<any> {
        return this.http.post(`http://127.169.43.55:8095/api/follow/${username}`, {});
    }

    unfollow(username: string): Observable<any> {
        return this.http.post(`http://127.169.43.55:8095/api/unfollow/${username}`, {});
    }

    req_type(username: string): Observable<any> {
        return this.http.get(`http://127.169.43.55:8095/api/req-type/${username}`);
    }
}
