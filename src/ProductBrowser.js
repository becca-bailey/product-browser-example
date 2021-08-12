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

export function ProductBrowser() {
  const {
    products,
    setSelectedProductId,
    selectedProductId,
    setAppliedFilters,
    appliedFilters,
    filters
  } = useProductBrowser();

  function Filters() {
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
  return (
    <Layout>
      <Filters />
      <ProductsGrid>
        {products.map(({ name, id, price, imageUrl }) => {
          const selected = selectedProductId === id;
          return (
            <Product
              key={id}
              onMouseEnter={() => setSelectedProductId(id)}
              onMouseLeave={() => setSelectedProductId(undefined)}
              selected={selected}
            >
              <Product.Image src={imageUrl}></Product.Image>
              <Product.Name>{name}</Product.Name>
              <Product.Price>{formatCurrency(price)}</Product.Price>
            </Product>
          );
        })}
      </ProductsGrid>
    </Layout>
  );
}
