import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollPositionSubject = new Subject<number>();

  getScrollPosition() {
    return this.scrollPositionSubject.asObservable();
  }

  updateScrollPosition(position: number) {
    this.scrollPositionSubject.next(position);
  }
}
