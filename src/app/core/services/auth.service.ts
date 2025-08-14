import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from "rxjs";
import { User } from "../../shared/models/user.model";
import { environment } from "../../../environments/environment";
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
    token: string;
    fullName: string;
    role: string;
}

interface JwtPayload {
    nameid: string;
    role: string;
    fullName: string;
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

    // Ejemplo de uso:
    getUserId(): string | null {
        const decoded = this.decodeToken();
        return decoded ? decoded.nameid : null;
    }

}