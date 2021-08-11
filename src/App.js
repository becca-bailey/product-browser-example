import "./styles.css";
import { ProductBrowser } from "./ProductBrowser";
import ProductBrowserContext from "./ProductBrowserContext";
import faker from "faker";
import { times, uniqWith, isEqual, sample } from "lodash";
import { ColorFilter } from "./ColorFilter";

function createProducts(count) {
  return times(count, (n) => {
    return {
      id: n,
      name: faker.commerce.productName(),
      price: faker.datatype.number(),
      color: faker.commerce.color(),
      gender: sample(["W", "M"])
    };
  });
}

const PRODUCTS = createProducts(500);

const FILTERS = [
  {
    category: "Gender",
    keyName: "gender",
    options: [
      {
        label: "Womens",
        value: "W"
      },
      {
        label: "Mens",
        value: "M"
      }
    ]
  },
  {
    category: "Colors",
    keyName: "color",
    filterComponent: ColorFilter,
    options: uniqWith(
      PRODUCTS.map(({ color }) => ({
        label: color,
        value: color.split(" ").join("")
      })),
      isEqual
    )
  }
];

export default function App() {
  return (
    <div className="App">
      <ProductBrowserContext initialProducts={PRODUCTS} filters={FILTERS}>
        <ProductBrowser></ProductBrowser>
      </ProductBrowserContext>
    </div>
  );
}
