import { Component, inject, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterOutlet],
  standalone: true,
  template: `
    <nav class="bg-black" aria-label="Main Navigation">
      <ul class="flex flex-row justify-between gap-2 px-2 py-2 text-white">
        <div class="flex flex-row gap-1">
          @for (route of routes; track $index) {
          <li>
            <a routerLink="{{ route.path }}">{{ route.data?.['title'] }}</a>
          </li>
          }
        </div>

        <li>
          <a>Login</a>
        </li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
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
