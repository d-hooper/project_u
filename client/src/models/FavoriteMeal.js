export class FavoriteMeal {
  constructor(data) {
    this.id = data.id
    this.spoonacularMealId = data.spoonacularMealId
    this.name = data.name
    this.image = data.image
    this.accountId = data.accountId
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
