import { mealsService } from "../services/MealsService.js";
import BaseController from "../utils/BaseController.js";

export class MealsController extends BaseController {
  constructor() {
    super('meal')
    this.router
      .post('', this.createMeal)
    // .post('/favorite', this.addFavoriteMealToDay)
  }
  async createMeal(request, response, next) {
    try {
      const mealData = request.body
      const userInfo = request.userInfo
      const meal = await mealsService.getOrCreateMeal(mealData, userInfo)
      response.send(meal)
    } catch (error) {
      next(error)
    }
  }

  // async addFavoriteMealToDay(request, response, next) {
  //   try {
  //     const mealData = request.body
  //     const userInfo = request.userInfo
  //     const meal = await mealsService.addFavoriteMealToDay(mealData, userInfo)
  //     response.send(meal)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}