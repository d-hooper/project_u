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
      .delete('/:mealId', this.deleteFavoriteMeal)
      .get('/:mealId', this.getFavoriteById)
  }
  async getFavoriteById(request, response, next) {
    try {
      const userInfo = request.userInfo
      const mealId = request.params.mealId
      const meal = await mealsService.getFavoriteById(mealId, userInfo)
      response.send(meal)
    } catch (error) {
      next(error)
    }
  }
  async deleteFavoriteMeal(request, response, next) {
    try {
      const userInfo = request.userInfo
      const mealId = request.params.mealId
      const message = await mealsService.deleteFavoriteMeal(userInfo, mealId)
      response.send(message)
    } catch (error) {
      next(error)
    }
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