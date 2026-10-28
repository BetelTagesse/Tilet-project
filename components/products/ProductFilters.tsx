import Link from "next/link";
import { COLOR_HEX } from "@/lib/catalog";

interface ProductFiltersProps {
  basePath: string;
  sizes: string[];
  colors: string[];
  selectedSizes: string[];
  selectedColors: string[];
}

// A plain GET form: no client JavaScript. Submitting reloads the page with
// ?size=M&color=gold in the URL, and the server does the filtering.
export default function ProductFilters({
  basePath,
  sizes,
  colors,
  selectedSizes,
  selectedColors,
}: ProductFiltersProps) {
  const hasActive = selectedSizes.length > 0 || selectedColors.length > 0;

  return (
    <form
      // key remounts the form when filters change, so checkboxes never go stale
      key={selectedSizes.join() + "|" + selectedColors.join()}
      method="get"
      action={basePath}
      className="space-y-6"
    >
      {sizes.length > 0 && (
        <fieldset>
          <legend className="mb-3 font-semibold">Size</legend>
          <div className="space-y-2">
            {sizes.map((size) => (
              <label
                key={size}
                className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary"
              >
                <input
                  type="checkbox"
                  name="size"
                  value={size}
                  defaultChecked={selectedSizes.includes(size)}
                  className="h-4 w-4 accent-tibeb-green"
                />
                {size}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {colors.length > 0 && (
        <fieldset>
          <legend className="mb-3 font-semibold">Color</legend>
          <div className="space-y-2">
            {colors.map((color) => (
              <label
                key={color}
                className="flex cursor-pointer items-center gap-2 text-sm capitalize text-text-secondary"
              >
                <input
                  type="checkbox"
                  name="color"
                  value={color}
                  defaultChecked={selectedColors.includes(color)}
                  className="h-4 w-4 accent-tibeb-green"
                />
                <span
                  aria-hidden="true"
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: COLOR_HEX[color] ?? "#cccccc" }}
                />
                {color}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-lg bg-tibeb-green px-4 py-2 text-sm font-semibold text-white"
        >
          Apply
        </button>
        {hasActive && (
          <Link
            href={basePath}
            className="text-sm text-tibeb-green hover:underline"
          >
            Clear filters
          </Link>
        )}
      </div>
    </form>
  );
}
