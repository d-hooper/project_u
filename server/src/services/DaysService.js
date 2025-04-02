import { dbContext } from "../db/DbContext.js"

class DaysService {
  updateCalorieGoal(newGoal) {
    throw new Error("Method not implemented.")
  }

  async getTodaysDetails(dayId) {

    const day = await dbContext.Day.findById(dayId)
    return day
  }
  async createDay(whichDay) {
    const day = await dbContext.Day.create(whichDay)
    return day
  }

}
export const daysService = new DaysService()