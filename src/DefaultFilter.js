import styled from "styled-components";

const FilterOption = styled.li`
  text-align: left;
  display: flex;
  align-items: center;
`;

export function DefaultFilter({ onChange, label, value }) {
  return (
    <FilterOption>
      <input id={value} type="checkbox" onChange={onChange}></input>
      <label htmlFor={value}>{label}</label>
    </FilterOption>
  );
}
