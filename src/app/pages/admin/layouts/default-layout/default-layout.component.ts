import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  user: any;
  roles: string[] = []
  menus = [
    
  ];

  constructor(private router: Router, private elRef: ElementRef, private service: UserService) {
    this.getUserLoggedRoles()
  }

  ngOnInit(): void {
    this.getUserLogged();
    
  }

  getUserLogged() {
    this.user = JSON.parse(localStorage.getItem('USER_OBJECT'));
  }
  getUserLoggedRoles() {
    this.roles = this.service.getUserRole();
    this.setMenu()
  }

  setMenu() {
    this.menus = [
      {
        name: 'Home',
        icon: 'home',
        url: '/admin/home',
        show: true
      },
      {
        name: 'Agendamentos',
        icon: 'event',
        url: '/admin/service-list',
        show: true
      },
      {
        name: 'Atendimentos',
        icon: 'calendar_month',
        url: '/admin/service-list-all',
        show: true
      },
      {
        name: 'Serviços',
        icon: 'badge',
        url: '/admin/servicing-list',
        show: this.roles.includes('ROLE_ADMIN')
      },
      {
        name: 'Usuários',
        icon: 'manage_accounts',
        url: '/admin/user-list',
        show: this.roles.includes('ROLE_ADMIN')
      },
      {
        name: 'Clientes',
        icon: 'people',
        url: '/admin/client-list',
        show: true
      },
      {
        name: 'Produtos',
        icon: 'inventory_2',
        url: '/admin/product-list',
        show: this.roles.includes('ROLE_ADMIN')
      },
      {
        name: 'Fornecedores',
        icon: 'factory',
        url: '/admin/supplier-list',
        show: this.roles.includes('ROLE_ADMIN')
      },
    ]
  }

  logout() {
    localStorage.removeItem('USER_TOKEN');
    localStorage.removeItem('USER_ROLES');
    localStorage.removeItem('USER_OBJECT');
    this.router.navigate(['/']);
  }
}
