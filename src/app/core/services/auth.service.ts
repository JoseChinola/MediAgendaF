import { Injectable } from "@angular/core";
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from "rxjs";

interface LoginResponse {
    token: string;
    fullName: string;
    role: string;
}

@Injectable({
    providedIn: "root"
})


export class AuthService {
    private apiURL = 'https://localhost:7283/api/User';



    private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    private loggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.loggedIn.asObservable();

    constructor(private http: HttpClient) {
        const userJson = localStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
        this.currentUserSubject.next(user);
        this.loggedIn.next(!!user);
    }

    login(user: User) {
        return this.http.post(`${this.apiURL}/login`, user).pipe(
            tap((res: any) => {
                localStorage.setItem('user', JSON.stringify(res));
                this.currentUserSubject.next(res);
                this.loggedIn.next(true);
            })
        );
    }

    register(user: User) {
        return this.http.post(`${this.apiURL}/register`, user);
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
        this.loggedIn.next(false);
    }

    // Métodos auxiliares
    getToken(): string | null {
        const user = this.currentUserSubject.value;
        return user ? user.token : null;
    }

    getRole(): string | null {
        const user = this.currentUserSubject.value;
        return user ? user.role : null;
    }

    getFullName(): string | null {
        const user = this.currentUserSubject.value;
        return user ? user.fullName : null;
    }



}