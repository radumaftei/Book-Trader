import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  onLogoutClick($event: MouseEvent) {
    this.router.navigate(['login']);
  }

  onHomepageClick($event: MouseEvent) {
    this.router.navigate(['homepage']);
  }

  onMyBooksClick($event: MouseEvent) {
    this.router.navigate(['personal-book-page']);
  }
}
