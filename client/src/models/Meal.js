export class Meal {
  constructor(data) {
    this.id = data.id
    this.name = data.name || data.title
    this.image = data.image
    // this.calories = data.nutrition.nutrients.amount
    this.servings = 0

  }
  imageBaseUrl = 'https://img.spoonacular.com/ingredients'

  get medImageURL() {

    return this.imageBaseUrl + '_250x250/' + this.image
  }
}