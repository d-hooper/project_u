import { dbContext } from "../db/DbContext.js"

class MealDaysService {
  // TODO check for a mealId for a specific account >> increase the serving size if trying to add another instance of the same meal >> go to meals Service and update meal object serving size
  async createMealDay(mealData) {
    const meal = await dbContext.MealDay.create(mealData)
    await meal.populate('meals')
    return meal
  }

}
export const mealDaysService = new MealDaysService()