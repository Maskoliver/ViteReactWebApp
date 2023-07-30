import { faker } from "@faker-js/faker";
import { Product } from "../types";

export const generateFakeProductData = (count: number): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    const product: Product = {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      image: faker.image.urlLoremFlickr({ category: "abstract" }),
      price: parseFloat(faker.commerce.price({ min: 1, max: 2500 })),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productMaterial(),
    };
    products.push(product);
  }
  return products;
};
