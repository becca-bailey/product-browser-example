import styled from "styled-components";
import { useProductBrowser } from "./ProductBrowserContext";
import { formatCurrency } from "./utils/formatCurrency";
import { Product } from "./Product";
import ProductFilterContext from "./ProductFilterContext";
import { FilterDrawer } from "./FilterDrawer";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem;
`;

const Layout = styled.main`
  display: grid;
  grid-template-columns: 10rem auto;
`;

function Filters() {
  const { setAppliedFilters, appliedFilters, filters } = useProductBrowser();
  return (
    <aside>
      {filters.map(({ category, keyName, options, filterComponent }) => (
        <ProductFilterContext
          key={keyName}
          onApply={(newValues) =>
            setAppliedFilters({ ...appliedFilters, [keyName]: newValues })
          }
        >
          <FilterDrawer
            category={category}
            options={options}
            filterComponent={filterComponent}
          ></FilterDrawer>
        </ProductFilterContext>
      ))}
    </aside>
  );
}

export function ProductBrowser() {
  const { products } = useProductBrowser();
  console.log(products);
  return (
    <Layout>
      <Filters />
      <ProductsGrid>
        {products.map(({ name, id, price, color }) => {
          return (
            <Product key={id}>
              <Product.Image color={color}></Product.Image>
              <Product.Name>{name}</Product.Name>
              <Product.Price>{formatCurrency(price)}</Product.Price>
            </Product>
          );
        })}
      </ProductsGrid>
    </Layout>
  );
}
