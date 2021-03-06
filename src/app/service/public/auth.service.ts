import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IUser} from '../../model/User';
import {map} from 'rxjs/operators';

const apiUrl = environment.apiSource;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject = new Subject<IUser>();
  isAuthenticated = false;
  isAdminLoggedIn = false;

  constructor(private httpClient: HttpClient) {
  }

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(apiUrl + '/auth/register', user);
  }

  login(email, password): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiSource}/auth/login`, {email, password})
      .pipe(map(iAccount => {
        localStorage.setItem('access_token', iAccount.access_token);
        localStorage.setItem('user', JSON.stringify(iAccount.user));
        localStorage.setItem('role', iAccount.roles[0].role_name);
        return iAccount;
      }));
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated = false;
  }
}
