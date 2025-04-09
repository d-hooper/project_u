import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/Meal.js').Meal[]} user info from the database*/
  searchedFoods: [],

  activeFood: null,
  /** @type {import('./models/Day.js').Day} user info from the database*/
  activeDay: null,
  /** @type {import('./models/Day.js').Day[]} user info from the database*/
  days: [],
  activeFoodServingSize: 1,
  /** @type {import('./models/MealEntry.js').MealEntry[]} user info from the database*/
  mealEntries: [],
  activeMealEntryId: null,
  /** @type {import('./models/FavoriteMeal.js').FavoriteMeal[]} user info from the database*/
  favoriteMeals: []
})

