import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
