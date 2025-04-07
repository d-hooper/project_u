import { Schema } from "mongoose";

export const MealEntrySchema = new Schema({
  mealId: { type: Schema.ObjectId, required: true, ref: "Meal" },
  dayId: { type: Schema.ObjectId, required: true, ref: "Day" },
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  servings: { type: Number, required: true, default: 1 }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

MealEntrySchema.virtual('meal',
  {
    localField: 'mealId',
    foreignField: '_id',
    justOne: true,
    ref: 'Meal'
  }
)