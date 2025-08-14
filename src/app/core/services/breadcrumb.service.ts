import { Injectable } from "@angular/core";
import { BehaviorSubject, filter } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Breadcrumb } from "../../shared/models/breadcrumb.model";



@Injectable({ providedIn: 'root' })

export class BreadcrumbService {
    private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
    public breadcrumbs$ = this.breadcrumbs.asObservable();


    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const root = this.route.root;
            const breadcrumbList: Breadcrumb[] = [];
            this.addBreadcrumb(root, '', breadcrumbList);
            this.breadcrumbs.next(breadcrumbList);
        });
    }


    private addBreadcrumb(route: ActivatedRoute, url: string, breadcrumb: Breadcrumb[]) {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return;
        }


        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const label = child.snapshot.data['breadcrumb'];
            if (label) {
                breadcrumb.push({ label, url });
            }

            this.addBreadcrumb(child, url, breadcrumb);
        }
    }
}