import { Auth0Provider } from "@bcwdev/auth0provider";
import { daysService } from "../services/DaysService.js";
import BaseController from "../utils/BaseController.js";
import { dbContext } from "../db/DbContext.js";

export class DaysController extends BaseController {
  constructor() {
    super('day')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getOrCreateDay)
      .get('/:dayId', this.getTodaysDetails)
      // .put('/:dayId', this.updateCalorieGoal)
  }

  async getTodaysDetails(request, response, next) {
    try {
      const dayId = request.params.dayId
      const details = await daysService.getTodaysDetails(dayId)
      response.send(details)
    } catch (error) {
      next(error)
    }
  }
  
  async getDayByCalendarDate(request, response, next) {
    try {
      const day = await daysService.getDayByCalendarDate()
      response.send(day)
    } catch (error) {
      next(error)
    }
  }


  
  async getOrCreateDay(request, response, next) {
    try {
      const userInfo = request.userInfo
      const day = await daysService.getOrCreateDay(userInfo)
      response.send(day)
    } catch (error) {
      next(error)
    }
  }

  // async updateCalorieGoal(request, response, next) {
  //   try {
  //     const userId = request.userInfo.id
  //     const newGoal = request.body
  //     const day = await daysService.updateCalorieGoal(newGoal)
  //     response.send(day)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}