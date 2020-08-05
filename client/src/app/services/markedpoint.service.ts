import { Injectable } from '@angular/core';

import {Markedpoint, AddPointRequest} from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarkedpointService {
  private pointsUrl = `${environment.apiUrl}/markedpoints/`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' /*, 'Authorization': 'Token bccf3cae8346044d9ee6e638484a0eb5d56a8612'*/})
  };

  constructor(private http: HttpClient) { }

  getPoints(): Observable<Markedpoint[]> {
    return this.http.get<Markedpoint[]>(this.pointsUrl, this.httpOptions);
  }
  addPoint(pointReq: AddPointRequest): Observable<Markedpoint> {
    return this.http.post<Markedpoint>(this.pointsUrl, pointReq, this.httpOptions);
  }
  updatePoint(point: Markedpoint): Observable<Markedpoint> {
    const url = `${this.pointsUrl}${point.id}/`;
    return this.http.put<Markedpoint>(url, point, this.httpOptions);
  }
  deletePoint(pointId: string): Observable<Markedpoint> {
    const url = `${this.pointsUrl}${pointId}/`;
    return this.http.delete<Markedpoint>(url, this.httpOptions);
  }
}
