import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class ThemeService {
    private renderer: Renderer2;
    private isDarkMode = false;


    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.loadTheme();
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            this.renderer.addClass(document.documentElement, 'dark');
        } else {
            this.renderer.removeClass(document.documentElement, 'dark');
        }
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    private loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.isDarkMode = true;
            this.renderer.addClass(document.documentElement, 'dark');
        } else {
            this.isDarkMode = false;
            this.renderer.removeClass(document.documentElement, 'dark');
        }
    }

    getIsDarkMode(): boolean {
        return this.isDarkMode;
    }
}