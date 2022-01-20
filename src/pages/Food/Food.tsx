enum FoodCategories {
  ALL = "VŠECHNO",
  VEGETARIAN = "BEZ MASA",
}

interface FoodInterface {
  name: string;
  image: string;
  categories: FoodCategories[];
  subitems?: FoodInterface[];
}

const FOODCATEGORIES: FoodCategories[] = [
  FoodCategories.ALL,
  FoodCategories.VEGETARIAN,
];

const FOODS: FoodInterface[] = [
  {
    name: "Pizza",
    image:
      "https://images.aktin.cz/recipe-cover/cover-desktop/1559890836-a-2935.jpg?v=1586538776",
    categories: [FoodCategories.ALL],
    subitems: [
      {
        name: "Pizza Jepes",
        image:
          "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80",
        categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN],
      },
      {
        name: "Pizza Nepes",
        image:
          "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg",
        categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN],
      },
      {
        name: "Pizza JepesČiNepes",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDfc3rlnKkuy0a-Fi4gjFSn4SLDyjyhPQHLhQhMp1l9CL5A5ddjShBR2ebD1VSVVKs7w&usqp=CAU",
        categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN],
      },
    ],
  },
  {
    name: "Guláš",
    image: "https://sazenicka.cz/wp-content/uploads/2019/05/tráva.jpg",
    categories: [FoodCategories.ALL, FoodCategories.VEGETARIAN],
  },
  {
    name: "Kebab",
    image:
      "https://dlabarnauno.adaptee.cz/assets/images/9714809b755cbebbb1a09b78768fe27e/36-600.jpg",
    categories: [FoodCategories.ALL],
  },
  {
    name: "Čína",
    image:
      "https://www.spektrumzdravi.cz/img/clanky/6fc8eb9e1234b80630774fdd45b8419f/kureci-cina-s-ryzi.jpg",
    categories: [FoodCategories.ALL],
  },
];

export { FoodCategories, FoodInterface, FOODS, FOODCATEGORIES };
