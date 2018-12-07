import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RenderProvider {

    constructor(public http: HttpClient) {
        
    }

    render_profile(username: string): Observable<any> {
        return this.http.get(`/server/profile/${username}`);
    }

    follow(username: string): Observable<any> {
        return this.http.post(`/server/follow/${username}`, {});
    }

    unfollow(username: string): Observable<any> {
        return this.http.post(`/server/unfollow/${username}`, {});
    }

}
