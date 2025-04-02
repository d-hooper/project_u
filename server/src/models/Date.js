import { Schema } from "mongoose";

export const DateSchema = new Schema(
  {
    id: { type: Schema.ObjectId, required: true },
    calorieGoal: { type: Number, min: 100, max: 7000, required: true },
    goalMet: { type: Boolean, default: false, required: true },
    mealsEaten: { type: Array, required: true },
    exercisesSaved: { type: Array, required: true },
    accountId: { type: Schema.ObjectId, required: true },
    journalBody: { type: String, minLength: 3, maxLength: 500, required: false },
    mood: { type: Number, min: 1, max: 10, required: false }
  },
  { timestamps: true, toJSON: { virtuals: true } } // maybe virtuals arent needed here?
)