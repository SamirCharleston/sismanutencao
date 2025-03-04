import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private router: Router) {}

  async navigateWithLoader(path: string, duration: number = 2000) {
    this.show();
    try {
      await new Promise(resolve => setTimeout(resolve, duration));
      await this.router.navigate([path]);
    } finally {
      this.hide();
    }
  }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
