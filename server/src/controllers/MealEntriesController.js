import { Auth0Provider } from "@bcwdev/auth0provider";
import { mealEntriesService } from "../services/MealEntriesService.js";
import BaseController from "../utils/BaseController.js";
import { mealsService } from "../services/MealsService.js";
import { daysService } from "../services/DaysService.js";

export class MealEntriesController extends BaseController {
  constructor() {
    // TODO fix this
    super('mealDay')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addEntryToDay)
      .delete('/:entryId', this.deleteEntry)
      .put('/:entryId', this.changeServings)
  }

  async addEntryToDay(request, response, next) {
    try {
      const mealData = request.body
      mealData.accountId = request.userInfo.id

      // {  spoonacularId, name, image, day?  }

      const entry = await mealsService.getOrCreateMeal(mealData, request.userInfo)

      response.send(entry)
    } catch (error) {
      next(error)
    }
  }

  async deleteEntry(request, response, next) {
    try {
      const userInfo = request.userInfo
      const entryId = request.params.entryId
      const message = await mealEntriesService.deleteEntry(userInfo, entryId)
      response.send(message)
    }
    catch (error) {
      next(error)
    }
  }

  async changeServings(request, response, next) {
    try {
      const userInfo = request.userInfo
      const entryId = request.params.entryId
      const entryData = request.body
      const entry = await mealEntriesService.changeServings(userInfo, entryId, entryData)
      response.send(entry)
    } catch (error) {
      next(error)
    }
  }

}



