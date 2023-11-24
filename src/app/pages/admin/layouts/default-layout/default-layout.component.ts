import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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
      url: '/admin/home',
    },
    {
      name: 'Agendamentos',
      icon: 'event',
      url: '/admin/service-list',
    },
    {
      name: 'Atendimentos',
      icon: 'calendar_month',
      url: '/admin/service-list-all',
    },
    {
      name: 'Serviços',
      icon: 'badge',
      url: '/admin/servicing-list',
    },
    {
      name: 'Usuários',
      icon: 'manage_accounts',
      url: '/admin/user-list',
    },
    {
      name: 'Clientes',
      icon: 'people',
      url: '/admin/client-list',
    },
    {
      name: 'Produtos',
      icon: 'inventory_2',
      url: '/admin/product-list',
    },
    {
      name: 'Fornecedores',
      icon: 'factory',
      url: '/admin/supplier-list',
    },
  ];

  constructor(private router: Router, private elRef: ElementRef) {}

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
    this.router.navigate(['/']);
  }
}
