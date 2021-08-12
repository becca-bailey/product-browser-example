import styled from "styled-components";

export const Product = styled.div.attrs({ "data-testid": "product" })`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid ${({ selected }) => (selected ? "blue" : "white")};
`;

const PlaceholderImage = styled.div`
  background-color: ${({ $color }) => $color};
  height: 10rem;
  width: 10rem;
`;

function Image({ color, src, name, ...rest }) {
  if (src) {
    return <img alt={name} src={src} {...rest} />;
  }
  return <PlaceholderImage $color={color}></PlaceholderImage>;
}

const Name = styled.p`
  margin: 0.5rem 0 0;
`;

const Price = styled.p`
  margin: 0;
  color: gray;
`;

Product.Image = Image;
Product.Name = Name;
Product.Price = Price;
