import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { accountService } from "./AccountService.js"

class DaysService {

  async getOrCreateDay(userInfo) {
    let day
    day = await this.getDayByCalendarDate(userInfo)
    if (!day) {
      day = await this.createDay(userInfo)
    }
    return day
  }

  // async getDayByCalendarDate(userInfo) {
  //   const today = new Date()
  //   const day = await dbContext.Day.findOne({
  //     createdAt: {
  //       $lte: today.setHours(0, 0, 0, 0),
  //       $gte: today.setHours(23, 59, 59, 999),
  //     },
  //     accountId: userInfo.id
  //   })
  //   return day
  // }

  async getDayByCalendarDate(userInfo) {
    const today = new Date().toLocaleDateString('ja-JP', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '-')
    const day = await dbContext.Day.findOne({
      createdAt: {
        $gte: today,
      },
      accountId: userInfo.id
    })
      .populate({
        path: "mealDays",
        populate: {
          path: "meal"
        }

      })
    return day
  }

  async getDayById(dayId) {
    const day = await dbContext.Day.findById(dayId).populate('mealDays')
    return day
  }

  async createDay(userInfo) {
    const account = await accountService.getAccount(userInfo)
    const day = await dbContext.Day.create({ accountId: account.id, calorieGoal: account.calorieGoal })
    return day
  }


  async updateDay(dayId, dayData, userInfo) {
    const day = await this.getDayById(dayId)
    if (day.accountId != userInfo.id) {
      throw new Forbidden(`Cannot update day information for other users ${userInfo.nickname}`.toUpperCase())
    }

    day.calorieGoal = dayData.calorieGoal ?? day.calorieGoal

    await day.save()
    return day
  }

}
export const daysService = new DaysService()