import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { daysService } from "./DaysService.js"
import { mealEntriesService } from "./MealEntriesService.js"

class MealsService {
  // async addFavoriteMealToDay(mealData, userInfo) {
  //   let meal = await dbContext.Meal.findOne({ spoonacularMealId: mealData.spoonacularMealId })

  //   if (meal == null) {
  //     meal = await dbContext.Meal.create({
  //       spoonacularMealId: mealData.spoonacularMealId,
  //       name: mealData.name,
  //       image: mealData.image,
  //       unit: mealData.unit,
  //       calorieCount: mealData.calorieCount,
  //       isRecipe: mealData.isRecipe
  //     })
  //   }

  //   const day = await daysService.getOrCreateDay(userInfo)
  //   const entry = await mealEntriesService.createEntry({
  //     dayId: day.id,
  //     mealId: meal.id,
  //     accountId: userInfo.id,
  //     servings: mealData.servings
  //   })
  //   return entry


  // }
  async getFavoriteMeal(userInfo) {
    const meals = await dbContext.FavoriteMeal.find({ accountId: userInfo.id })
    return meals
  }
  async favoriteMeal(mealData, userInfo) {
    if (mealData.accountId != userInfo.id) {
      throw new Forbidden('You cannot favorite a meal for someone else, bucko')
    }

    const meal = await dbContext.FavoriteMeal.create({
      spoonacularMealId: mealData.spoonacularMealId,
      calorieCount: mealData.calorieCount,
      name: mealData.name,
      image: mealData.image,
      unit: mealData.unit,
      isRecipe: mealData.isRecipe,
      accountId: userInfo.id
    })
    return meal
  }


  async getOrCreateMeal(mealData, userInfo) {
    let meal = await dbContext.Meal.findOne({ spoonacularMealId: mealData.spoonacularMealId })
    let unitInfo = mealData.unit
    if (unitInfo == 'undefined' || undefined) {
      unitInfo = 'serving'
    }


    if (meal == null) {
      meal = await dbContext.Meal.create({
        spoonacularMealId: mealData.spoonacularMealId,
        calorieCount: mealData.calorieCount ?? mealData.calories.amount,
        name: mealData.name,
        image: mealData.image,
        unit: unitInfo,
        isRecipe: mealData.isRecipe
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