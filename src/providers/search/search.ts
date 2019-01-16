import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class SearchProvider {

    constructor(public http: HttpClient) {
        
    }

    search(type, term): Observable<any>{
        return this.http.get(`http://127.169.43.55:8095/api/search/${type}/${term}`);
    }

    load_trends(): Observable<any>{
        return this.http.post(`http://127.169.43.55:8095/api/request-trends`, {});
    }

}
