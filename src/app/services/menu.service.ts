import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isExpanded$ = new BehaviorSubject<boolean>(false);

  toggle() {
    this.isExpanded$.next(!this.isExpanded$.value);
  }

  collapse() {
    this.isExpanded$.next(false);
  }
}
