import { AppState } from "@/AppState.js"

export class Meal {
  constructor(data) {
    this.id = data.id
    this.name = data.name || data.title
    this.image = data.image
    this.possibleUnits = data.possibleUnits
    this.isRecipe = data.isRecipe
    // this.calories = data.nutrition.nutrients.amount

  }
  imageBaseUrl = 'https://img.spoonacular.com/ingredients'

  stringStarter = 'https://img.spoonacular.com'
  get smImageURL() {
    if (this.image.includes(this.stringStarter)) {
      return this.image
    }
    return this.imageBaseUrl + '_100x100/' + this.image
  }
  get medImageURL() {
    if (this.image.includes(this.stringStarter)) {
      return this.image
    }
    return this.imageBaseUrl + '_250x250/' + this.image
  }
  get lgImageURL() {
    if (this.image.includes(this.stringStarter)) {
      return this.image
    }
    return this.imageBaseUrl + '_500x500/' + this.image
  }
  // NOTE we could add more potential units for it to find, or later we could have the user change the unit (perhaps using a dropdown)
  get theUnit() {
    if (!this.possibleUnits) {
      return ''
    }
    const unit = this.possibleUnits.find(unit => unit == 'serving') || this.possibleUnits.find(unit => unit == 'piece') || 'g'
    return unit
  }
}

export class ActiveMeal extends Meal {
  constructor(data) {
    super(data)
    this.spoonacularMealId = data.id
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
    this.unit = data.unit
  }
}
export class Recipe extends ActiveMeal {
  constructor(data) {
    super(data);
    this.extendedIngredients = data.extendedIngredients
    this.sourceName = data.sourceName
    this.sourceUrl = data.sourceUrl
  }
  isRecipe = true
}