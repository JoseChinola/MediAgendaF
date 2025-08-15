import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from "rxjs";
import { User } from "../../shared/models/user.model";
import { environment } from "../../../environments/environment";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";

interface LoginResponse {
    token: string;
    fullName: string;
    role: string;
}

interface JwtPayload {
    nameid: string;
    role: string;
    fullName: string;
    exp: number;
}

@Injectable({
    providedIn: "root"
})

export class AuthService {
    private apiURL = `${environment.apiUrl}/User`;



    private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    private loggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.loggedIn.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        const userJson = localStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
        this.currentUserSubject.next(user);
        this.loggedIn.next(!!user);

        this.checkToken();
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

    decodeToken(): JwtPayload | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const decoded: JwtPayload = jwtDecode(token);
            return decoded;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }


    getUserId(): string | null {
        const decoded = this.decodeToken();
        return decoded ? decoded.nameid : null;
    }

    isTokenExpired(): boolean {
        const decoded = this.decodeToken();
        if (!decoded || !decoded.exp) return true;

        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
    }

    checkToken(): void {
        const token = this.getToken();
        if (!token) return;

        if (this.isTokenExpired()) {
            this.logout();
            alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            this.router.navigate(['/login']);
        }
    }

}