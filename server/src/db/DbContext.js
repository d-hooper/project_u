import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { DateSchema } from '../models/Date.js';
import { MealSchema } from '../models/Meal.js';
import { ExerciseSchema } from '../models/Exercise.js';


class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Date = mongoose.model('Date', DateSchema);
  Meal = mongoose.model('Meal', MealSchema);
  Exercise = mongoose.model('Exercise', ExerciseSchema);
}

export const dbContext = new DbContext()
