import { render, screen, fireEvent } from "@testing-library/react";
import { ProductBrowser } from "./ProductBrowser";
import ProductBrowserContext from "./ProductBrowserContext";
import { formatCurrency } from "./utils/formatCurrency";

const products = [
  {
    id: "1",
    name: "Shorts",
    color: "pink",
    price: 20
  },
  {
    id: "2",
    name: "Leggings",
    color: "blue",
    price: 39
  },
  {
    id: "3",
    name: "Shirt",
    color: "yellow",
    price: 39
  }
];

const filters = [
  {
    category: "Colors",
    keyName: "color",
    options: [
      {
        label: "Pink",
        value: "pink"
      },
      {
        label: "Yellow",
        value: "yellow"
      },
      {
        label: "Blue",
        value: "blue"
      }
    ]
  }
];

function ContextProvider({ children }) {
  return (
    <ProductBrowserContext filters={filters} initialProducts={products}>
      {children}
    </ProductBrowserContext>
  );
}

describe("ProductBrowser", () => {
  it("displays products", () => {
    render(<ProductBrowser />, {
      wrapper: ContextProvider
    });

    expect(screen.queryAllByTestId(/product/)).toHaveLength(3);
  });

  it("dislays a name and price for each product", () => {
    render(<ProductBrowser />, {
      wrapper: ContextProvider
    });

    const renderedProducts = screen.getAllByTestId(/product/);

    renderedProducts.forEach((product, i) => {
      const { name, price } = products[i];
      expect(product.innerHTML).toContain(name);
      expect(product.innerHTML).toContain(formatCurrency(price));
    });
  });

  it("filters products by color", () => {
    render(<ProductBrowser />, {
      wrapper: ContextProvider
    });

    fireEvent.click(screen.getByLabelText(/blue/i));

    expect(screen.queryAllByTestId(/product/)).toHaveLength(1);

    fireEvent.click(screen.getByLabelText(/pink/i));

    expect(screen.queryAllByTestId(/product/)).toHaveLength(2);
  });
});
