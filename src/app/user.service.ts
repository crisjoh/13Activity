import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string = "http://localhost:80";
  private headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(
      this.url+"/users"
    );
  }
  
  addUser(user):Observable<any>{
    return this.http.post<any>(
      this.url + "/user",
      user,
      {headers:this.headers}
    );
  }
  
  updateUser(user: User,id: string):Observable<User>{
    return this.http.put<User>(
      this.url+"/user/"+ id, user, {headers:this.headers});
  }

  deleteUser(id: string):Observable<any>{
    return this.http.delete<any>(this.url + "/user/" + id);
  }

}