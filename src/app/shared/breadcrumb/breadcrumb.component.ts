import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.buildBreadcrumb(this.activatedRoute.root))
      )
      .subscribe(breadcrumbs => {
        this.breadcrumbs = breadcrumbs;
      });
  }

  buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string; url: string }> = []): Array<{ label: string; url: string }> {
    // If no more child routes, return breadcrumbs
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    // Get the first child route (important for nested routes)
    const childRoute = children[0];

    // Get the route's config and breadcrumb label
    const routeURL: string = childRoute.snapshot.url.map(segment => segment.path).join('/');
    const label = childRoute.snapshot.data['breadcrumb'];

    // Append breadcrumb if label exists
    if (routeURL !== '' && label) {
      url += `/${routeURL}`;
      breadcrumbs.push({ label, url });
    }

    // Recursive call to build the breadcrumb
    return this.buildBreadcrumb(childRoute, url, breadcrumbs);
  }
}
