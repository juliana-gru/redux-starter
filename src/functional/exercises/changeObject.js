import { produce } from 'immer';

const recipe = { 
  name: "Spaghetti Bolognese", 
  ingredients: ["egg", "salt"] 
};

const addCream = produce(recipe, newRecipe => {
  newRecipe.ingredients = [...recipe.ingredients, "cream"]
});

const replaceEgg = produce(recipe, newRecipe => {
  newRecipe.ingredients = recipe.ingredients.map(input => input === 'egg' ? 'egg white' : input);
});

const removeEgg = produce(recipe, newRecipe => {
  newRecipe.ingredients = recipe.ingredients.filter(input => input !== "egg");
});

console.log(addCream)
console.log(replaceEgg)
console.log(removeEgg)
