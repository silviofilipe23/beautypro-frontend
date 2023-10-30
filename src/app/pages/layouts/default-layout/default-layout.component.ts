import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  user: any;
  menus = [
    {
      name: 'Home',
      icon: 'home',
      url: '/home',
    },
    {
      name: 'Agendamentos',
      icon: 'event',
      url: '/service-list',
    },
    {
      name: 'Serviços',
      icon: 'badge',
      url: '/servicing-list',
    },
    {
      name: 'Usuários',
      icon: 'manage_accounts',
      url: '/user-list',
    },
    {
      name: 'Clientes',
      icon: 'people',
      url: '/client-list',
    },
    {
      name: 'Produtos',
      icon: 'inventory_2',
      url: '/product-list',
    },
    {
      name: 'Fornecedores',
      icon: 'factory',
      url: '/supplier-list',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserLogged();
  }

  getUserLogged() {
    this.user = JSON.parse(localStorage.getItem('USER_OBJECT'));
  }

  logout() {
    localStorage.removeItem('USER_TOKEN');
    localStorage.removeItem('USER_ROLES');
    localStorage.removeItem('USER_OBJECT');
    this.router.navigate(['/login']);
  }
}
