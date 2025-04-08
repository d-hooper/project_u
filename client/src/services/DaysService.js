import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Day } from "@/models/Day.js"
import { AppState } from "@/AppState.js"
import { MealEntry } from "@/models/MealEntry.js"

class DaysService {
  // updateDay(id) {
  //   const response = await api.put(`day/${id}`)

  // }
  async getOrCreateCurrentDay() {
    const response = await api.get('day')
    // logger.log(response.data)
    const day = new Day(response.data)
    AppState.activeDay = day
    AppState.mealEntries = day.mealEntries
  }


  async getDaysByAccountId() {
    const response = await api.get('account/days')
    logger.log('Previous Days', response.data)
    const days = response.data.map(day => new Day(day))
    AppState.days = days
  }
  setActiveDay(dayId) {
    const newDay = AppState.days.find(day => day.id == dayId)
    AppState.activeDay = newDay
    AppState.mealEntries = newDay.mealEntries
    logger.log(newDay)
  }
}

export const daysService = new DaysService()