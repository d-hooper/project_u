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

  get dayCaloriesConsumed() {
    let dayCalorieCount = 0
    for (let i = 0; i < this.mealDays.length; i++) {
      const mealDay = this.mealDays[i];
      let mealTotal = mealDay.meal.calorieCount * mealDay.meal.servingSize
      dayCalorieCount += mealTotal
    }
    return dayCalorieCount
  }
}