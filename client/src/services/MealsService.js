import { logger } from "@/utils/Logger.js"
import { spoonacularApi } from "./AxiosService.js"
import { ActiveMeal, Meal } from "@/models/Meal.js"
import { AppState } from "@/AppState.js"




class MealsService {

  async getDetailsById(id) {
    AppState.activeFood = null
    const response = await spoonacularApi.get(`food/ingredients/${id}/information?amount=20`)
    logger.log('here is your detailed food', response.data)
    const food = new ActiveMeal(response.data)
    AppState.activeFood = food

  }

  async getFoodItemsByQuery(searchQuery) {
    const response = await spoonacularApi.get(`food/ingredients/search?query=${searchQuery}&minCalories=50`)
    logger.log(response.data)
    const ingredients = response.data.results.map(ing => new Meal(ing))
    AppState.searchedFoods = ingredients
    logger.log(AppState.searchedFoods)
  }

}

export const mealsService = new MealsService()