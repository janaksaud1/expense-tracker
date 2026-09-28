import { ALL_CATEGORIES, SORT_OPTIONS } from '../utils/constants.js';

export default function FilterBar({
  category,
  sortOrder,
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All categories</option>
          {ALL_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort-order">Sort by date</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
