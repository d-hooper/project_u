import { Schema } from "mongoose";

export const MealDaySchema = new Schema({
  mealId: { type: Schema.ObjectId, required: true, ref: "Meal" },
  dayId: { type: Schema.ObjectId, required: true, ref: "Day" },
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

MealDaySchema.virtual('meal',
  {
    localField: 'mealId',
    foreignField: '_id',
    justOne: false,
    ref: 'Meal'
  }
)