import { FoodCategories, FoodInterface } from "./Food";
import rybicky from "../../assets/img/rybicky.png";

// TODO: Exposnout pouze klientovi s tokenem školníka
const RYBICKY: FoodInterface = {
  name: "Rybičky",
  image: rybicky,
  categories: [FoodCategories.ALL, FoodCategories.FISH],
};

export default RYBICKY;
