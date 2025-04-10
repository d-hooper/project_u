export class FavoriteMeal {
  constructor(data) {
    this.id = data.id
    this.spoonacularMealId = data.spoonacularMealId
    this.name = data.name
    this.image = data.image
    this.accountId = data.accountId
    this.calorieCount = data.calorieCount
    this.unit = data.unit
    this.isRecipe = data.isRecipe
    this.extendedIngredients = data.extendedIngredients
    this.sourceName = data.sourceName
    this.sourceUrl = data.sourceUrl
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
}

