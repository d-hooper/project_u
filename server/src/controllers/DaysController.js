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
      .get('/:dayId', this.getDayById)
      .put('/:dayId', this.updateDay)

  }

  async getDayById(request, response, next) {
    try {
      const dayId = request.params.dayId
      const details = await daysService.getDayById(dayId)
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

  async updateDay(request, response, next) { // update meals exercises and more for the day
    try {
      const userInfo = request.userInfo
      const dayData = request.body
      const dayId = request.params.dayId

      const day = await daysService.updateDay(dayId, dayData, userInfo)
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