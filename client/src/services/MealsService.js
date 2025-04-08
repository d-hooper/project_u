import { logger } from "@/utils/Logger.js"
import { api, spoonacularApi } from "./AxiosService.js"
import { ActiveMeal, Meal } from "@/models/Meal.js"
import { AppState } from "@/AppState.js"
import { MealEntry } from "@/models/MealEntry.js"




class MealsService {
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