enum FoodCategories {
  ALL = "VŠECHNO",
  VEGETARIAN = "BEZ MASA",
  FISH = "RYBY",
}

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
    image:
      "https://images.aktin.cz/recipe-cover/cover-desktop/1559890836-a-2935.jpg?v=1586538776",
    categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN, FoodCategories.FISH],
    subitems: [
      {
        name: "Pizza Margherita",
        image:
          "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg",
        categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN, FoodCategories.FISH],
        priceEst: 100,
      },
      {
        name: "Pizza Hawaii",
        image:
          "https://fototapeta12.cz/themes/default-bootstrap/functions/timthumb.php?src=https://st2.depositphotos.com/1699440/8512/i/950/depositphotos_85123736-stock-photo-close-up-pizza-hawai.jpg&w=1023&h=682",
        priceEst: 130,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Pizza Šunková",
        image: "http://pekarstvijecminek.cz/204-thickbox_default/pizza-sunkova.jpg",
        priceEst: 120,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Pizza Vegetariana",
        image: "https://pizzafranci.cz/fotky/pizza/pizza-vegetariana.jpg",
        priceEst: 120,
        categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN, FoodCategories.FISH],
      },
    ],
  },
  {
    name: "Kebab",
    image:
      "https://dlabarnauno.adaptee.cz/assets/images/9714809b755cbebbb1a09b78768fe27e/36-600.jpg",
    categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN, FoodCategories.FISH],
    subitems: [
      {
        name: "Klasický Kebab",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpaPANYtew9iO10gzLjYy-UnV-TSNdQOJwIA&usqp=CAU",
        priceEst: 100,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Vegetariánský Kebab",
        image:
          "https://bitofthegoodstuff.com/wp-content/uploads/2018/05/Seitan-Doner-Kebab-5-1000.jpg",
        priceEst: 100,
        categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN, FoodCategories.FISH],
      },
    ],
  },
  {
    name: "Čína",
    image:
      "https://c3.primacdn.cz/sites/default/files/image_crops/image_620/1/1671253_smazene-nudle-s-kurecim-masem-2_image_620.jpg",
    categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN, FoodCategories.FISH],
    subitems: [
      {
        name: "Kuře kung-pao",
        image: "https://www.vartesmajklem.cz/picture/large/20190205092304799979724.jpg",
        priceEst: 100,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Nudle s kuřecím",
        image:
          "https://www.kvalitnitunak.eu/fotky89909/blog/kureci-s-ryzovymi-nudlemi-a-zeleninou.jpeg",
        priceEst: 100,
        categories: [FoodCategories.ALL],
      },
      {
        name: "Nudle se zeleninou",
        image:
          "https://itesco.cz/imgglobal/content_platform/recipes/main/17/sized/756x426-100-fff-0-0/17c2044f0c8c136f69f4cb95c3dc90ff.jpg",
        priceEst: 100,
        categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN, FoodCategories.FISH],
      },
    ],
  },
];

export { FoodCategories, FoodInterface, FOODS, FOODCATEGORIES };
