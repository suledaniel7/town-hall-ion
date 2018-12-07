import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class SearchProvider {

    constructor(public http: HttpClient) {
        
    }

    search(type, term): Observable<any>{
        return this.http.get(`/server/search/${type}/${term}`);
    }

    load_trends(): Observable<any>{
        return this.http.post(`/server/request-trends`, {});
    }

}
