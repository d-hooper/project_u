import { Auth0Provider } from "@bcwdev/auth0provider";
import { mealsService } from "../services/MealsService.js";
import BaseController from "../utils/BaseController.js";

export class FavoritesController extends BaseController {
  constructor() {
    super('favorites')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/meal', this.getFavoriteMeal)
      .post('/meal', this.favoriteMeal)
  }
  async getFavoriteMeal(request, response, next) {
    try {
      const userInfo = request.userInfo
      const meals = await mealsService.getFavoriteMeal(userInfo)
      response.send(meals)
    } catch (error) {
      next(error)
    }
  }


  async favoriteMeal(request, response, next) {
    try {
      const userInfo = request.userInfo


      const mealData = request.body
      mealData.accountId = userInfo.id
      const meal = await mealsService.favoriteMeal(mealData, userInfo)
      response.send(meal)
    } catch (error) {
      next(error)
    }
  }
}