import React, { useContext, useState } from "react";

const Context = React.createContext();

export const useProductFilters = () => {
  return useContext(Context);
};

function ProductFilterContext({
  children,
  initialSelectedFilters = [],
  onApply
}) {
  const [selectedFilters, setSelectedFilters] = useState(
    initialSelectedFilters
  );

  function updateSelectedFilters(newSelectedFilters) {
    setSelectedFilters(newSelectedFilters);
    onApply(newSelectedFilters);
  }

  const value = {
    selectedFilters,
    updateSelectedFilters
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default ProductFilterContext;
