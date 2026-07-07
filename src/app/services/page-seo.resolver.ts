import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { map } from "rxjs/operators";
import { ContentService } from "./content.service";

interface PageSeoRow {
  title: string;
  description: string;
  keywords: string;
  og_image_url: string;
}

export interface ResolvedSeo {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export const pageSeoResolver: ResolveFn<ResolvedSeo | null> = (route) => {
  const content = inject(ContentService);
  const slug = route.routeConfig?.path ?? "";

  return content.getRow<PageSeoRow>("page_seo", { slug }).pipe(
    map((row) =>
      row
        ? {
            title: row.title,
            description: row.description,
            keywords: row.keywords,
            ogImage: row.og_image_url,
          }
        : null,
    ),
  );
};
