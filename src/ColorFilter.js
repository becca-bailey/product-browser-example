import styled from "styled-components";

const FilterOption = styled.li`
  text-align: left;
  display: flex;
  align-items: center;
`;

const ColorSwatch = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  margin: 0 3px;
`;

export function ColorFilter({ onChange, label, value }) {
  return (
    <FilterOption>
      <input id={value} type="checkbox" onChange={onChange}></input>
      <ColorSwatch $color={value} />
      <label htmlFor={value}>{label}</label>
    </FilterOption>
  );
}
