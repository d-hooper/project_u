import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Day } from "@/models/Day.js"
import { AppState } from "@/AppState.js"
import { MealEntry } from "@/models/MealEntry.js"

class DaysService {
  async getOrCreateCurrentDay() {
    const response = await api.get('day')
    // logger.log(response.data)
    const day = new Day(response.data)
    AppState.activeDay = day
    const mealEntries = response.data.mealEntry.map(md => new MealEntry(md))
    AppState.mealEntries = mealEntries
  }

  async getDaysByAccountId() {
    const response = await api.get('account/days')
    logger.log('Previous Days', response.data)
  }
}

export const daysService = new DaysService()