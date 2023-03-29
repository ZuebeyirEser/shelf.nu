import type { RouteMatch } from "@remix-run/react";
import { BreadcrumbChevron } from "~/components/icons/library";

export function Breadcrumb({
  match,
  isLastItem,
}: {
  match: RouteMatch;
  isLastItem: boolean;
}) {
  let breadcrumb = match?.handle?.breadcrumb(match);

  /**
   * If the value is "single" that means we have to
   * take the page title and render it.
   * This takes care of showing the correct title in item show page*/
  if (typeof breadcrumb === "string" && breadcrumb === "single") {
    breadcrumb = match.data.item.title;
  }

  return (
    <div className="breadcrumb">
      {breadcrumb}{" "}
      {!isLastItem && (
        <span className="mx-4">
          <BreadcrumbChevron className="inline align-middle" />
        </span>
      )}
    </div>
  );
}
