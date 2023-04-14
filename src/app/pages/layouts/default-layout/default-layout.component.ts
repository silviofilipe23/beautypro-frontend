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
      icon: '',
      url: '/client-list',
    },
    {
      name: 'Usuários',
      icon: '',
      url: '/user-list',
    },
    {
      name: 'Clientes',
      icon: '',
      url: '/client-list',
    },
    {
      name: 'Produtos',
      icon: '',
      url: '/product-list',
    },
    {
      name: 'Fornecedores',
      icon: '',
      url: '/supplier-list',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
