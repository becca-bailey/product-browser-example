import styled from "styled-components";
import { DefaultFilter } from "./DefaultFilter";
import { useProductFilters } from "./ProductFilterContext";

const FiltersList = styled.ul`
  list-style-type: none;
`;

export function FilterDrawer({
  category,
  options,
  filterComponent: FilterComponent = DefaultFilter
}) {
  const { selectedFilters, updateSelectedFilters } = useProductFilters();
  return (
    <div>
      <h2>{category}</h2>
      <FiltersList>
        {options.map(({ label, value, colorSwatch }) => {
          return (
            <FilterComponent
              key={value}
              label={label}
              value={value}
              onChange={(event) => {
                const { checked } = event.target;
                if (checked) {
                  updateSelectedFilters([...selectedFilters, value]);
                } else {
                  updateSelectedFilters(
                    selectedFilters.filter((filter) => filter !== value)
                  );
                }
              }}
            />
          );
        })}
      </FiltersList>
    </div>
  );
}
