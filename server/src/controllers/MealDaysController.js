import { Auth0Provider } from "@bcwdev/auth0provider";
import { mealDaysService } from "../services/MealDaysService.js";
import BaseController from "../utils/BaseController.js";

export class MealDaysController extends BaseController {
  constructor() {
    super('mealDay')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMealDay)
  }

  async createMealDay(request, response, next) {
    try {
      const mealData = request.body
      mealData.accountId = request.userInfo.id
      const meal = await mealDaysService.createMealDay(mealData)
      response.send(meal)
    } catch (error) {
      next(error)
    }
  }
}