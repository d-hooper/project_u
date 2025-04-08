import { logger } from "@/utils/Logger.js"
import { api, spoonacularApi } from "./AxiosService.js"
import { ActiveMeal, Meal } from "@/models/Meal.js"
import { AppState } from "@/AppState.js"




class MealsService {
  setActiveMealEntryId(mealEntryId) {
    AppState.activeMealEntryId = mealEntryId
  }
  async changeServings(mealEntryId, serving) {
    const updatedMealEntry = await api.put(`mealDay/${mealEntryId}`, { servings: serving })
    logger.log(updatedMealEntry)

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
    const recipes = response.data.results.map(ing => new Meal(ing))
    AppState.searchedFoods = recipes
  }

  async getDetailsById(id, unit) {
    AppState.activeFood = null
    const response = await spoonacularApi.get(`food/ingredients/${id}/information?amount=1&unit=${unit}`)
    logger.log('here is your detailed food', response.data)
    const food = new ActiveMeal(response.data)
    AppState.activeFood = food


  }
  resetServingSize() {
    AppState.activeFoodServingSize = 1
  }
  decreaseServingSize() {
    if (AppState.activeFoodServingSize == 0) {
      return
    }
    AppState.activeFoodServingSize--
  }
  increaseServingSize() {
    AppState.activeFoodServingSize++
  }
  async addMealToDay(meal) {
    const response = await api.post(`mealDay/entry`, meal)
    logger.log()
    AppState.activeFoodServingSize = 1
  }


  // &minCalories=50

}

export const mealsService = new MealsService()