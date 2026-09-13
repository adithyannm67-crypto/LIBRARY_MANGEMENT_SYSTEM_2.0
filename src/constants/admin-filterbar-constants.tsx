/**
 * Per-page filter bar configuration for the admin portal.
 *
 * Each entry describes the input boxes, select dropdowns, and tab buttons
 * shown in the <Filterbar /> component (src/components/features/admin-filterBar.tsx)
 * for a given admin page. The component matches a config by `match` against the
 * current pathname and renders its `fields` in order.
 */

export interface FilterOption {
  /** Text rendered inside the <option> / tab button */
  label: string;
  /** Value written to the URL search param */
  value: string;
}

export type FilterField =
  | {
      type: "search";
      /** URL search param this input reads/writes (e.g. "q") */
      param: string;
      placeholder: string;
    }
  | {
      type: "select";
      /** URL search param this select reads/writes */
      param: string;
      /**
       * Static options, or the literal "cats" to pull the option list from the
       * `cats` prop passed to <Filterbar /> at runtime (used by the books page).
       */
      options: FilterOption[] | string[];
    }
  | {
      type: "tabs";
      /** URL search param these tab buttons read/write */
      param: string;
      options: FilterOption[] | string[];
    };

export interface FilterBarConfig {
  /** Substring matched against the current pathname to pick this bar */
  match: string;
  fields: FilterField[];
}

export const FILTER_BARS = ({
  cats,
}: {
  cats: string[];
}): FilterBarConfig[] => {
  return [
    {
      match: "books",
      fields: [
        {
          type: "search",
          param: "q",
          placeholder: "Search name or nationality…",
        },
        {
          type: "select",
          param: "sort",
          options: [
            { label: "Highest Rated", value: "rating" },
            { label: "Title A–Z", value: "title" },
          ],
        },
        {
          type: "select",
          param: "cat",
          options: cats ?? [""],
        },
      ],
    },
    {
      match: "authors",
      fields: [
        {
          type: "search",
          param: "q",
          placeholder: "Search name or nationality…",
        },
        {
          type: "select",
          param: "sort",
          options: [
            { label: "Highest Rated", value: "rating" },
            { label: "Name A–Z", value: "name" },
          ],
        },
      ],
    },
    {
      match: "members",
      fields: [
        {
          type: "search",
          param: "q",
          placeholder: "Search name or email…",
        },
        {
          type: "select",
          param: "filter",
          options: ["All", "active", "suspended", "expired"],
        },
        {
          type: "select",
          param: "tier",
          options: ["All", "Standard", "Premium", "Staff"],
        },
      ],
    },
    {
      match: "borrows",
      fields: [
        {
          type: "search",
          param: "q",
          placeholder: "Search member or book…",
        },
        {
          type: "tabs",
          param: "filter",
          options: ["All", "active", "overdue", "returned"],
        },
      ],
    },
    {
      match: "inventory",
      fields: [
        {
          type: "search",
          param: "q",
          placeholder: "Search by title…",
        },
        {
          type: "select",
          param: "cond",
          options: ["All", "excellent", "good", "fair", "damaged", "lost"],
        },
        {
          type: "select",
          param: "filter",
          options: ["All", "available", "borrowed", "reserved", "maintenance"],
        },
      ],
    },
    {
      match: "publishers",
      fields: [
        {
          type: "search",
          param: "q",
          placeholder: "Search name or country…",
        },
      ],
    },
    {
      match: "reservations",
      fields: [
        {
          type: "search",
          param: "q",
          placeholder: "Search member or book…",
        },
        {
          type: "tabs",
          param: "filter",
          options: ["All", "pending", "ready", "fulfilled", "cancelled"],
        },
      ],
    },
  ];
};

export const getFilterBar = ({
  path,
  cats = [],
}: {
  path: string;
  cats?: string[];
}) => {
  return FILTER_BARS({ cats }).find((o) => path.includes(o.match));
};
