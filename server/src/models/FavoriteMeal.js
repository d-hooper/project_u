import { Schema } from "mongoose";

export const FavoriteMealSchema = new Schema(
  // {
  //   name: { type: String, required: true, },
  //   image: { type: String, required: true },
  //   spoonacularMealId: { type: String, required: true },
  //   accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  // },
  //   { timestamps: true, toJSON: { virtuals: true } }

  {
    spoonacularMealId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    calorieCount: { type: Number, required: true },
    unit: { type: String },
    isRecipe: { type: Boolean, required: true, default: false },
    accountId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

FavoriteMealSchema.virtual('meal',
  {
    localField: 'spoonacularMealId',
    foreignField: '_id',
    justOne: true,
    ref: 'Meal'
  }
)

FavoriteMealSchema.index({ spoonacularMealId: 1, accountId: 1 }, { unique: true })