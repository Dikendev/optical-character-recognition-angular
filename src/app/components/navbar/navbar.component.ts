import { Component, inject, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  template: `
    <nav
      class="fixed top-0 right-0 left-0 z-50 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 bg-opacity-70"
      aria-label="Main Navigation"
    >
      <ul class="flex flex-row justify-between gap-2 px-2 py-2 text-white">
        <div class="flex flex-row gap-1">
          @for (route of routes; track $index) {
          <li>
            <a routerLink="{{ route.path }}">{{ route.data?.['title'] }}</a>
          </li>
          }
        </div>
      </ul>
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  private navigation = inject(NavbarService);

  routes: Route[] = [];

  ngOnInit(): void {
    this.routes = this.getRoutes();
  }

  private getRoutes(): Route[] {
    return this.navigation.getNavigationRoutes();
  }
}
