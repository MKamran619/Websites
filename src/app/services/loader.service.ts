import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * Tracks in-flight async work (route navigation, HTTP requests, Supabase
 * queries) via a pending-request counter, so overlapping loading sources
 * compose correctly — the loader only hides once every source has finished.
 */
@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();

  private pending = 0;

  show(): void {
    this.pending++;
    if (this.pending === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide(): void {
    this.pending = Math.max(0, this.pending - 1);
    if (this.pending === 0) {
      this.loadingSubject.next(false);
    }
  }
}
