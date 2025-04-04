import { dbContext } from "../db/DbContext.js"

class MealsService {
  async getOrCreateMeal(mealData) {
    const meal = await dbContext.Meal.findOneAndUpdate({ spoonacularMealId: mealData.spoonacularMealId }, mealData, { upsert: true, new: true })
    return meal
  }

}
export const mealsService = new MealsService()