import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MongoserviceService {

  constructor(private http: HttpClient) { }
  
  insert(params) {
    return this.http.post('http://127.0.0.1:8887/insert/',
    { params });
    }
    retrieve(params) {
    return this.http.get('http://127.0.0.1:8887/retrieve/',
    { params });
    }

    delete(params) {
      return this.http.delete('http://127.0.0.1:8887/delete/',
      { params });
      }
      
      update(params) {
        return this.http.put('http://127.0.0.1:8887/update/',
        { params });
        }
      
    
      deleteone(params) {
        return this.http.delete('http://127.0.0.1:8887/deleteEach/',
        { params });
        
        }
    insertdb(params) {
      return this.http.post('http://127.0.0.1:8887/insertdb/',
      { params });
      }
}
