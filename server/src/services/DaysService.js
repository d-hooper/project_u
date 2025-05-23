import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { accountService } from "./AccountService.js"

class DaysService {

  async getDaysByAccountId(userId) {
    const days = await dbContext.Day
      .find({ accountId: userId })
      .populate({
        path: "mealEntry",
        populate: {
          path: "meal"
        }
      })
      .sort('date')
      .limit(7)
    return days
  }

  async getOrCreateDay(userInfo) {
    let day
    day = await this.getDayByCalendarDate(userInfo)
    if (!day) {
      day = await this.createDay(userInfo)
    }
    return day
  }

  async getDayByCalendarDate(userInfo) {
    const today = new Date().toLocaleDateString('ja-JP', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '-')
    const day = await dbContext.Day.findOne({
      createdAt: {
        $gte: today,
      },
      accountId: userInfo.id
    })
      .populate({
        path: "mealEntry",
        populate: {
          path: "meal"
        }

      })
    return day
  }

  async getDayById(dayId) {
    const day = await dbContext.Day.findById(dayId).populate('mealEntry')
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