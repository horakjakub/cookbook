import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  title = 'app works!';

  menuPages:menuPageAdress[] = [
    {
      title: 'Search',
      url: ''
    },
    {
      title: 'Contact',
      url: 'contact'
    }
  ];

  selectedPage:menuPageAdress = this.menuPages[0];

  constructor(
    private router: Router
    ){

  }

  changePage(page: menuPageAdress): void {
    this.selectedPage = page;
    this.router.navigate([page.url]);
  }
}

export interface menuPageAdress {
  title: string;
  url: string;
}
