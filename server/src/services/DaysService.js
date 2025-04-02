import { dbContext } from "../db/DbContext.js"
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
    return day
  }

  async getTodaysDetails(dayId) {

    const day = await dbContext.Day.findById(dayId)
    return day
  }
  async createDay(userInfo) {
    const account = await accountService.getAccount(userInfo)
    const day = await dbContext.Day.create({ accountId: account.id, calorieGoal: account.calorieGoal })
    return day
  }

}
export const daysService = new DaysService()