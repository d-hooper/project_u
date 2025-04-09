export class MealEntry {
  constructor(data) {
    this.id = data.id
    this.dayId = data.dayId
    this.accountId = data.accountId
    this.meal = data.meal
    this.servings = data.servings
    this.unit = data.unit

  }

  imageBaseUrl = 'https://img.spoonacular.com/ingredients'
  stringStarter = 'https://img.spoonacular.com'

  get smImageURL() {
    if (this.meal.image.includes(this.stringStarter)) {
      return this.meal.image
    }
    return this.imageBaseUrl + '_100x100/' + this.meal.image
  }
  get medImageURL() {
    if (this.meal.image.includes(this.stringStarter)) {
      return this.meal.image
    }
    return this.imageBaseUrl + '_250x250/' + this.meal.image
  }
  get lgImageURL() {
    if (this.meal.image.includes(this.stringStarter)) {
      return this.meal.image
    }
    return this.imageBaseUrl + '_500x500/' + this.meal.image
  }
}