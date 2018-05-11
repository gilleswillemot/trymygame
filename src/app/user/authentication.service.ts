import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from './user.model';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable()
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private readonly _url = '/API/users';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.username
    );
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http
      .get(`${this._url}/currentUser`)
      .pipe(map(User.fromJSON));
  }

  // getUser(): Observable<User> {
  //   return this.http
  //   .get(`${this._url}/user/${id}`)
  //   .pipe(map(User.fromJSON));

  // }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      setTimeout(() => this._user$.next(null));
    }
  }

  register(newUser: User): Observable<boolean> {
    return this.http.post(`${this._url}/register`, newUser).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(newUser.username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  update(user: User): Observable<boolean> {
      const theUrl = `${this._url}/update/${user.username}`;
      return this.http.post(theUrl, user).pipe(map((res: any) => {
        console.log(res);
        const raw = res;
        if (user) {
          // localStorage.setItem(this._tokenKey, token);
          // this._user$.next(user.username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkemail`, { email }).pipe(
      map((item: any) => {
        if (item.email === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  checkCorrectCurrentPassword(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkpassword/${username}`, { password }).pipe(
      map((item: any) => {
        if (item.email === 'wrongpassword') {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
