 // val.hits.map(item => item.recipe).map(item =>{ let recipe = {}; recipe.imgUrl = item.image; recipe.calories = item.calories; recipelabel= itemlabel recipeurl= itemurl recipeingredients= item.ingredientLines; return recipe })
import { IRecipe } from './../models/recipe';

export const RECIPES: Array<IRecipe> =  [
    {
      imgUrl:"https://www.edamam.com/web-img/18d/18dcf05995cb40e8ce4c077972341d7a.jpg",
      calories: 7045.096938934326,
      label:"Herbes de Provence Rotisserie Chickens",
      url:"http://www.bonappetit.com/recipe/herbes-de-provence-rotisserie-chickens",
      ingredients: [
        "2 tablespoons (1/4 stick) butter, room temperature",
        "2 tablespoons dried herbes de provence*",
        "1 tablespoon coarse kosher salt",
        "2 (3 1/2-pound) chickens"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/279/2793088da34ec5397abb8848852bb8dc.jpg",
      calories: 4451.411159373098,
      label:"Sunday Supper: Jerk Half-Chickens",
      url:"http://www.seriouseats.com/recipes/2011/06/jerk-chicken-recipe.html",
      ingredients: [
        "1/2 teaspoon allspice berries, ground",
        "3 large garlic cloves, peeled",
        "4 scallions, trimmed",
        "1 hot pepper, seeded (depending on how hot you like it, scotch bonnets are traditional but long peppers or even jalapenos work in a pinch)",
        "Juice of 1 lime",
        "2 tablespoons soy sauce",
        "3 tablespoons vegetable oil",
        "2 large pinches of kosher salt",
        "2 large pinches freshly cracked black pepper",
        "1 small bunch thyme",
        "3/4 teaspoon freshly grated nutmeg",
        "1/2 teaspoon cinnamon",
        "2 chickens"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/6ff/6ff3dcb7d112fa5831966600949206f1.jpg",
      calories: 7043.3496044335925,
      label:"Roasted Chickens With Lemon And Orange",
      url:"http://www.foodandwine.com/recipes/roasted-chickens-with-lemon-and-orange",
      ingredients: [
        "Two 3 1/2-lb chickens",
        "Salt and freshly ground pepper",
        "1 lemon, halved",
        "1 orange, halved",
        "8 garlic cloves",
        "8 rosemary sprigs",
        "8 thyme sprigs"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/cd5/cd581091462bdb9cf9e4f5675b22e0f0.jpg",
      calories: 5244.24700208374,
      label:"Sage Pesto Roasted Chicken",
      url:"http://notwithoutsalt.com/sage-walnut-pesto-three-ways/",
      ingredients: [
        "1 medium-size whole chicken (about 4 lbs)",
        "Salt and pepper (about ¾ tsp kosher salt per lb)",
        "½ cup sage pesto"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/f0b/f0bb99d6e4b66f491bbda5615b0a180c.jpg",
      calories: 2095.5336799999995,
      label:"Classic Roast Chicken Recipe",
      url:"http://leitesculinaria.com/78228/recipes-classic-roast-chicken.html",
      ingredients: [
        "One 4 1/2-to-5 pound chicken",
        "Extra-virgin olive oil",
        "Kosher salt and freshly ground pepper",
        "1/2 small yellow onion, cut into chunks (optional)",
        "4 or 5 fresh flat-leaf (italian) parsley sprigs (optional)",
        "4 large fresh thyme sprigs (optional)"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/546/54684561d3c521a8fa973cd04764b492.jpg",
      calories: 240.8968,
      label:"Chicken Broth Elixir",
      url:"http://www.marthastewart.com/348801/chicken-broth-elixir",
      ingredients: [
        "2 chicken backs, necks, and wing tips, cut from whole chickens used for other recipes",
        "6 chicken thighs",
        "1 large yellow onion, quartered",
        "4 garlic cloves, smashed",
        "2 celery stalks, coarsely chopped",
        "1 tablespoon coarse salt"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/e5e/e5e970a474f571622f5f2eb233a801b0.jpg",
      calories: 7712.132218092546,
      label:"Mustard-Crusted Roast Chickens",
      url:"http://www.finecooking.com/recipes/mustard-crusted-roast-chickens.aspx",
      ingredients: [
        "2 tbs. chopped fresh thyme",
        "1 cup dijon mustard",
        "Kosher salt and freshly ground black pepper",
        "1/4 cup minced garlic (12 to 16 cloves)",
        "1/2 cup minced shallots (about 2 large)",
        "2 whole chickens, about 3-1/2 lb. each",
        "5 tbs. extra-virgin olive oil for drizzling"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/21e/21e3ccd89b2f502ef9382b13eafa895b.jpg",
      calories: 8045.429610071183,
      label:"Sour-Orange Yucatán Chickens",
      url:"http://www.foodandwine.com/recipes/sour-orange-yucatan-chickens",
      ingredients: [
        "20 garlic cloves, halved",
        "1/4 cup vegetable oil",
        "1 1/3 cups fresh orange juice",
        "1/2 cup fresh lemon juice",
        "1/4 cup pure ancho chile powder",
        "2 tablespoons hot paprika",
        "4 teaspoons kosher salt, plus more for seasoning",
        "2 teaspoons ground cumin",
        "Two 3 1/2-pound chickens",
        "1/4 cup plus 1 tablespoon honey"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/76c/76c0ac111170ae36c587c8640b9fcfb4.jpg",
      calories: 4820.874327659607,
      label:"Herb-Roasted Chickens",
      url:"http://www.myrecipes.com/recipe/herb-roasted-chickens",
      ingredients: [
        "6 tablespoons olive oil",
        "1/2 cup poultry seasoning",
        "1/4 cup fresh rosemary leaves, finely chopped",
        "1/4 cup fresh thyme leaves, finely chopped",
        "4 teaspoons fresh minced garlic",
        "2 teaspoons salt",
        "1 teaspoon pepper",
        "2 (3- to 4-lb.) whole chickens"
      ]
    },
    {
      imgUrl:"https://www.edamam.com/web-img/efb/efb29c096bf050abeff8926f904253c9.jpg",
      calories: 4160.116564941406,
      label:"Chicken Mole",
      url:"http://www.realsimple.com/food-recipes/browse-all-recipes/chicken-mole",
      ingredients: [
        "2 3 1/2- to 4-lb rotisserie chickens",
        "18 ozs jarred mole or enchilada sauce"
      ]
    }
  ]
