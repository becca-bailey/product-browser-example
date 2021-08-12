import "./styles.css";
import { ProductBrowser } from "./ProductBrowser";
import ProductBrowserContext from "./ProductBrowserContext";
import faker from "faker";
import { times, uniqWith, isEqual, sample } from "lodash";
import { ColorFilter } from "./ColorFilter";

// 1. Fork this repository
// 2. Copy it to your github (using github tab on left)
// 3. Clone it from github
// 4. Run yarn and yarn start from the root to open in browser
// 5. Fix the performance bugs, and note the differences you see in the profiler

function createProducts(count) {
  return times(count, (n) => {
    return {
      id: n,
      name: faker.commerce.productName(),
      price: faker.datatype.number(),
      color: faker.commerce.color(),
      gender: sample(["W", "M"]),
      imageUrl: faker.image.image(200, 200)
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
