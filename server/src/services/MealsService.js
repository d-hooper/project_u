import { dbContext } from "../db/DbContext.js"
import { daysService } from "./DaysService.js"
import { mealEntriesService } from "./MealEntriesService.js"

class MealsService {
  async getOrCreateMeal(mealData, userInfo) {
    let meal = await dbContext.Meal.findOne({ spoonacularMealId: mealData.spoonacularMealId })

    if (meal == null) {
      meal = await dbContext.Meal.create({
        spoonacularMealId: mealData.spoonacularMealId,
        calorieCount: mealData.calories.amount,
        name: mealData.name,
        image: mealData.image,
        unit: mealData.unit
      })
    }

    const day = await daysService.getOrCreateDay(userInfo)

    const entry = await mealEntriesService.createEntry({
      dayId: day.id,
      mealId: meal.id,
      accountId: userInfo.id,
      servings: mealData.servings
    })
    // TODO I don't know if we need this, ask Jake when he gets here
    // const meal = await dbContext.Meal.findOneAndUpdate({ spoonacularMealId: mealData.spoonacularMealId, calorieCount: mealData.calories.amount, servingSize: mealData.amount ?? 1 }, mealData, { upsert: true, new: true })
    return entry
  }

}
export const mealsService = new MealsService()