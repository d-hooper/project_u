import { logger } from "@/utils/Logger.js"
import { api, spoonacularApi } from "./AxiosService.js"
import { ActiveMeal, Meal, Recipe } from "@/models/Meal.js"
import { AppState } from "@/AppState.js"
import { MealEntry } from "@/models/MealEntry.js"
import { FavoriteMeal } from "@/models/FavoriteMeal.js"




class MealsService {
  async addFoodToFavorites(food) {
    const response = await api.post('favorites/meal', food)
    // { spoonacularMealId: food.id, name: food.name, image: food.image, calorieCount: food.calorieCount }
    logger.log('favorite meals', response.data)
    AppState.activeFoodServingSize = 1
  }
  async getFavoriteMeals() {
    const response = await api.get('favorites/meal')
    logger.log(response.data)
    const favorites = response.data.map(pojo => new FavoriteMeal(pojo))
    AppState.favoriteMeals = favorites
  }
  async deleteEntry(id) {
    const response = await api.delete(`mealDay/${id}`)
    logger.log('here is your deleted meal entry', response.data)
    const entryIndex = AppState.mealEntries.findIndex(entry => entry.id == id)
    AppState.mealEntries.splice(entryIndex, 1,)
  }
  setActiveMealEntryId(mealEntryId) {
    AppState.activeMealEntryId = mealEntryId
  }

  async changeServings(mealEntryId, serving) {
    const response = await api.put(`mealDay/${mealEntryId}`, { servings: serving })
    const updatedMealEntry = new MealEntry(response.data)
    // logger.log(updatedMealEntry)
    const entryIndex = AppState.mealEntries.findIndex(entry => entry.id == mealEntryId)
    AppState.mealEntries.splice(entryIndex, 1, updatedMealEntry)
  }
  async getFoodItemsByQuery(searchQuery) {
    const response = await spoonacularApi.get(`food/ingredients/search?query=${searchQuery}&minCalories=50&number=100&metaInformation=true`)
    logger.log(response.data)
    const ingredients = response.data.results.map(ing => new Meal(ing))
    AppState.searchedFoods = ingredients
    logger.log(AppState.searchedFoods)
  }

  async getRecipesByQuery(searchQuery) {
    const response = await spoonacularApi.get(`recipes/complexSearch?query=${searchQuery}&minCalories=50&number=100&metaInformation=true`)
    logger.log(response.data)
    const recipes = response.data.results.map(recipe => new Meal(recipe))
    AppState.searchedFoods = recipes
  }

  async getIngredientDetailsById(id, unit) {
    AppState.activeFood = null
    if (unit == undefined || unit == 'undefined') {
      unit = 'serving'
    }
    const response = await spoonacularApi.get(`food/ingredients/${id}/information?amount=1&unit=${unit}`)
    logger.log('here is your detailed food', response.data)
    const food = new ActiveMeal(response.data)
    AppState.activeFood = food
  }

  async getRecipeDetailsById(food) {
    AppState.activeFood = null
    const response = await spoonacularApi.get(`recipes/${food?.spoonacularMealId || food.id}/information?includeNutrition=true`)
    const recipe = new Recipe(response.data)
    AppState.activeFood = recipe
    logger.log('here is your detailed food', AppState.activeFood)
  }

  resetServingSize() {
    AppState.activeFoodServingSize = 1
  }
  decreaseServingSize() {
    if (AppState.activeFoodServingSize == 1) {
      return
    }
    AppState.activeFoodServingSize--
  }
  increaseServingSize() {
    AppState.activeFoodServingSize++
  }
  async addMealToDay(meal) {
    const response = await api.post(`mealDay`, meal)
    logger.log(response.data)
    AppState.activeFoodServingSize = 1
  }

}

export const mealsService = new MealsService()