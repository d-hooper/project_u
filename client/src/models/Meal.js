export class Meal {
  constructor(data) {
    this.id = data.id
    this.name = data.name || data.title
    this.image = data.image
    // this.calories = data.nutrition.nutrients.amount
    this.servings = 0

  }
  imageBaseUrl = 'https://img.spoonacular.com/ingredients'

  get smImageURL() {
    return this.imageBaseUrl + '_100x100/' + this.image
  }
  get medImageURL() {
    return this.imageBaseUrl + '_250x250/' + this.image
  }
  get lgImageURL() {
    return this.imageBaseUrl + '_500x500/' + this.image
  }
}

export class ActiveMeal extends Meal {
  constructor(data) {
    super(data)
    this.category = data.categoryPath
    this.calories = data.nutrition.nutrients.find(object => object.name == 'Calories')

  }
}