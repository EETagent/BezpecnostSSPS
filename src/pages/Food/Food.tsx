const foodImage = import.meta.glob("../../assets/img/food/**/*.jpg", {
  eager: true,
});
/**
 * Returns food image asset path
 * @param {string} type Food type -> Pizza, Čína, atd.
 * @param {string} name Food name -> Margherita
 * @returns {string} Image path
 */
const getFoodImage = (type: string, name: string): string => {
  const typeParsed = type.toLowerCase();
  const nameParsed = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  type globAsset = {
    default: string;
  };
  const asset = foodImage[
    `../../assets/img/food/${typeParsed}/${typeParsed}${nameParsed}.jpg`
  ] as globAsset;
  return asset.default;
};

/**
 * Enum for food categories
 * @enum {string}
 */
enum FoodCategories {
  /**
   * @member {string}
   * Eats all
   */
  ALL = "VŠECHNO",
  /**
   * @member {string}
   * No meat
   */
  VEGETARIAN = "BEZ MASA",
  /**
   * @member {string}
   * No meat, only fish
   */
  FISH = "RYBY",
}

/**
 * Interface describing food option
 */
interface FoodInterface {
  name: string;
  image: string;
  categories: FoodCategories[];
  priceEst?: number;
  subitems?: FoodInterface[];
}

const FOODCATEGORIES: FoodCategories[] = [
  FoodCategories.ALL,
  FoodCategories.VEGETARIAN,
  FoodCategories.FISH,
];

const FOODS: FoodInterface[] = [
  {
    name: "Pizza",
    image: getFoodImage("pizza", "pizza"),
    categories: [
      FoodCategories.ALL,
      FoodCategories.VEGETARIAN,
      FoodCategories.FISH,
    ],
    subitems: [
      {
        name: "Pizza Margherita",
        image: getFoodImage("pizza", "margherita"),
        categories: [
          FoodCategories.ALL,
          FoodCategories.VEGETARIAN,
          FoodCategories.FISH,
        ],
        priceEst: 115,
      },
      {
        name: "Pizza Hawaii",
        image: getFoodImage("pizza", "hawaii"),
        priceEst: 145,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Pizza Šunková",
        image: getFoodImage("pizza", "sunkova"),
        priceEst: 135,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Pizza Vegetariana",
        image: getFoodImage("pizza", "vegetariana"),
        priceEst: 135,
        categories: [
          FoodCategories.ALL,
          FoodCategories.VEGETARIAN,
          FoodCategories.FISH,
        ],
      },
    ],
  },
  {
    name: "Kebab",
    image: getFoodImage("kebab", "kebab"),
    categories: [
      FoodCategories.ALL,
      FoodCategories.VEGETARIAN,
      FoodCategories.FISH,
    ],
    subitems: [
      {
        name: "Klasický Kebab",
        image: getFoodImage("kebab", "klasicky"),
        priceEst: 115,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Vegetariánský Kebab",
        image: getFoodImage("kebab", "vegetariansky"),
        priceEst: 115,
        categories: [
          FoodCategories.ALL,
          FoodCategories.VEGETARIAN,
          FoodCategories.FISH,
        ],
      },
    ],
  },
  {
    name: "Čína",
    image: getFoodImage("cina", "cina"),
    categories: [
      FoodCategories.ALL,
      FoodCategories.VEGETARIAN,
      FoodCategories.FISH,
    ],
    subitems: [
      {
        name: "Kuře kung-pao",
        image: getFoodImage("cina", "kungpao"),
        priceEst: 125,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Nudle s kuřecím",
        image: getFoodImage("cina", "kureci"),
        priceEst: 120,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Nudle se zeleninou",
        image: getFoodImage("cina", "zelenina"),
        priceEst: 120,
        categories: [
          FoodCategories.ALL,
          FoodCategories.VEGETARIAN,
          FoodCategories.FISH,
        ],
      },
    ],
  },
];

export { FoodCategories, FoodInterface, FOODS, FOODCATEGORIES };
