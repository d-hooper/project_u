import { mealsService } from "../services/MealsService.js";
import BaseController from "../utils/BaseController.js";

export class MealsController extends BaseController {
  constructor() {
    super('meal')
    this.router
      .post('', this.createMeal)
  }
  async createMeal(request, response, next) {
    try {
      const mealData = request.body
      const meal = await mealsService.getOrCreateMeal(mealData)
      response.send(meal)
    } catch (error) {
      next(error)
    }
  }
}