import React, { useContext, useState } from "react";

const Context = React.createContext();

export const useProductBrowser = () => {
  return useContext(Context);
};

function ProductBrowserContext({
  children,
  initialProducts = [],
  filters = []
}) {
  const [appliedFilters, setAppliedFilters] = useState({});
  const [selectedProductId, setSelectedProductId] = useState();

  // In real life, this is handled on the server side
  // This should be wrapped in React.useMemo()
  const getFilteredProducts = () => {
    return initialProducts.filter((product) => {
      return Object.entries(appliedFilters).every(([key, values]) => {
        if (!values.length) {
          return product;
        }
        return values.includes(product[key]);
      });
    });
  };

  const value = {
    products: getFilteredProducts(),
    filters,
    appliedFilters,
    setAppliedFilters,
    selectedProductId,
    setSelectedProductId
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ProductBrowserContext;
