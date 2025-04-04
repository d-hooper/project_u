export class Meal {
  constructor(data) {
    this.id = data.id
    this.name = data.name || data.title
    this.image = data.image
    this.possibleUnits = data.possibleUnits
    // this.calories = data.nutrition.nutrients.amount

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
    this.carbohydrates = data.nutrition.nutrients.find(object => object.name == 'Carbohydrates')
    this.sugar = data.nutrition.nutrients.find(object => object.name == 'Sugar')
    this.caffeine = data.nutrition.nutrients.find(object => object.name == 'Caffeine')
    this.protein = data.nutrition.nutrients.find(object => object.name == 'Protein')
    this.sodium = data.nutrition.nutrients.find(object => object.name == 'Sodium')
    this.iron = data.nutrition.nutrients.find(object => object.name == 'Iron')
    this.fat = data.nutrition.nutrients.find(object => object.name == 'Fat')
    this.calcium = data.nutrition.nutrients.find(object => object.name == 'Calcium')
    this.cholesterol = data.nutrition.nutrients.find(object => object.name == 'Cholesterol')
    this.serving = data.nutrition.weightPerServing.amount
    this.unitLong = data.unitLong
  }
}