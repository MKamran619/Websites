import { ExperimentalPendingTasks } from "@angular/core";
import { MonoTypeOperatorFunction } from "rxjs";
import { finalize } from "rxjs/operators";

/**
 * Registers an Angular pending task for the lifetime of the source
 * Observable, so SSR/prerendering waits for it before serializing HTML.
 *
 * Why this exists: Angular's HttpClient automatically registers pending
 * requests with ApplicationRef's stability tracking; supabase-js does not
 * (it calls the global `fetch` directly), so without this, SSR/prerendering
 * has no idea a Supabase query is still in flight and can serialize the
 * page before it resolves.
 *
 * This must wrap the whole RxJS chain (not just the raw fetch Promise) and
 * release via `finalize()`, not `Promise.finally()` on the fetch call
 * directly: `finalize()`'s teardown only runs after the source has finished
 * notifying its downstream subscriber, so the pending task correctly stays
 * registered through response-body parsing and RxJS operator processing,
 * right up until the *consuming component* has received its value - not
 * just until the network round-trip itself completes. Removing the task
 * too early (at the raw-fetch level) let the app get marked "stable" and
 * get captured mid-flight, before the value ever reached the component.
 */
export function withPendingTask<T>(
  pendingTasks: ExperimentalPendingTasks,
): MonoTypeOperatorFunction<T> {
  return (source) => {
    const removeTask = pendingTasks.add();
    let removed = false;
    return source.pipe(
      finalize(() => {
        if (!removed) {
          removed = true;
          removeTask();
        }
      }),
    );
  };
}
