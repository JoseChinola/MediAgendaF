import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class ThemeService {
    private darkTheme = false;

    constructor() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            this.darkTheme = true;
            document.documentElement.classList.add('dark');
        }
    }

    toggleTheme(): void {
        this.darkTheme = !this.darkTheme;
        console.log('Tema actual:', this.darkTheme ? 'oscuro' : 'claro');

        if (this.darkTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    isDarkMode(): boolean {
        return this.darkTheme;
    }
}