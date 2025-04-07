import { Schema } from "mongoose";
import { AccountSchema } from "./Account.js";

export const DaySchema = new Schema(
  {
    calorieGoal: { type: Number, min: 100, max: 7000, required: true },
    // NOTE compute on client instead
    // goalMet: { type: Boolean, default: false, required: true },
    exercisesSaved: [{ type: Schema.ObjectId, required: true, ref: 'Exercise' }],
    day: { type: String, default: () => new Date().toLocaleDateString('ja-JP', { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('/', '-') },
    accountId: { type: Schema.ObjectId, required: true },
    journalBody: { type: String, minLength: 3, maxLength: 500, required: false },
    mood: { type: Number, min: 0, max: 10, required: false, default: 0 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

DaySchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
}
)

DaySchema.virtual('mealEntry', {
  localField: "_id",
  foreignField: "dayId",
  ref: "MealEntry",
  justOne: false
})