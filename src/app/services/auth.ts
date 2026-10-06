import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {

  }
  login(data){
    return this.http.post('http://localhost:8000/login', data);
  }
}
