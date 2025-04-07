import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js";

class MealEntriesService {
  // TODO check for a mealId for a specific account >> increase the serving size if trying to add another instance of the same meal >> go to meals Service and update meal object serving size
  async deleteEntry(userInfo, entryId) {
    const entry = await dbContext.MealEntry.findById(entryId)
    if (userInfo.id != entry.accountId) {
      throw new Forbidden('YOU CANNOT DELETE SOMEONE ELSES MEAL ENTRY')
    }
    await entry.deleteOne()
    return 'You successful deleted a meal entry'
  }

  async createEntry(entryData) {
    const entry = await dbContext.MealEntry.create(entryData)
    await entry.populate('meal')
    return entry
  }

}
export const mealEntriesService = new MealEntriesService()