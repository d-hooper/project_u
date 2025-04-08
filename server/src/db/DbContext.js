import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { DaySchema } from '../models/Day.js';
import { MealSchema } from '../models/Meal.js';
import { ExerciseSchema } from '../models/Exercise.js';
import { MealEntrySchema } from '../models/MealEntry.js';
import { FavoriteMealSchema } from '../models/FavoriteMeal.js';


class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Day = mongoose.model('Day', DaySchema);
  Meal = mongoose.model('Meal', MealSchema);
  Exercise = mongoose.model('Exercise', ExerciseSchema);
  MealEntry = mongoose.model('MealEntry', MealEntrySchema)

  FavoriteMeal = mongoose.model('FavoriteMeal', FavoriteMealSchema)
}

export const dbContext = new DbContext()
