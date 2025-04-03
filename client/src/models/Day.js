export class Day {
  constructor(data) {
    this.id = data.id
    this.calorieGoal = data.calorieGoal
    this.accountId = data.accountId
    this.journalBody = data.journalBody
    this.mood = data.mood
    this.mealDays = data.mealDays
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}