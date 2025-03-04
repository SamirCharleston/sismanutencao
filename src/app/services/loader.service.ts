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

  async navigateWithLoader(path: string, duration: number = 3000) {
    this.show();
    try {
      await new Promise(resolve => setTimeout(resolve, duration));
      await this.router.navigate([path]);
    } finally {
      this.hide();
    }
  }

  private show() {
    this.isLoading.next(true);
  }

  private hide() {
    this.isLoading.next(false);
  }
}
