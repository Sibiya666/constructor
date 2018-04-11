import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MocData } from './moc';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AppService {

    constructor(private http: HttpClient) {}

    loadCars(): Observable<any> {
        // return this.http.get('')
        return Observable.of(MocData)
    }
}