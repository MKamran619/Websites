import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnrollPayload {
  name: string;
  email: string;
  phone?: string;
  courseId?: string;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class EnrollService {
  private endpoint = '/api/enroll';

  constructor(private http: HttpClient) {}

  enroll(payload: EnrollPayload): Observable<any> {
    return this.http.post(this.endpoint, payload);
  }
}
