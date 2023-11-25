import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navbarExpanded = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.navbarExpanded = window.scrollY <= 100;
  }

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.getScrollPosition().subscribe((position) => {
      // Lógica adicional conforme necessário
    });
  }
}
