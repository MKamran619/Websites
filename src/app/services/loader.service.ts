import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();

  // Min and max loading time in milliseconds
  private minLoadTime = 300;
  private maxLoadTime = 800;

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }

  // Show loader for a random duration
  showWithRandomDuration(): void {
    this.show();
    const randomDuration = this.getRandomDuration();
    setTimeout(() => {
      this.hide();
    }, randomDuration);
  }

  // Get a random duration between min and max
  private getRandomDuration(): number {
    return (
      Math.floor(Math.random() * (this.maxLoadTime - this.minLoadTime + 1)) +
      this.minLoadTime
    );
  }

  // Show loader and hide after specified duration
  showForDuration(duration: number): void {
    this.show();
    setTimeout(() => {
      this.hide();
    }, duration);
  }
}
