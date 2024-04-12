export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  calories: number;
  price: number;
  id: string;
}

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  image: string;
  id: string;
}

// export enum Units {
//   cup = 'Cup',
//   ounce = 'Ounce',
//   pound = 'Pound',
//   tablespoon = 'Tablespoon',
//   teaspoon = 'Teaspoon',
//   each = 'Each',
// }
