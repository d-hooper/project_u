import { Schema } from "mongoose";
import { AccountSchema } from "./Account.js";

export const DaySchema = new Schema(
  {
    // NOTE commented out stuff will be brought back in for later phases
    calorieGoal: { type: Number, min: 100, max: 7000, required: true },
    goalMet: { type: Boolean, default: false, required: true },
    mealsEaten: { type: Array, required: true },
    // exercisesSaved: { type: Array, required: true },
    accountId: { type: Schema.ObjectId, required: true },
    // journalBody: { type: String, minLength: 3, maxLength: 500, required: false },
    // mood: { type: Number, min: 1, max: 10, required: false, default: null }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

DaySchema.virtual('account', { localField: 'accountId', foreignField: '_id', justOne: true, ref: 'Account' }

)