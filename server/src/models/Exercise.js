import { Schema } from "mongoose";

export const ExerciseSchema = new Schema(
  {
    id: { type: Schema.ObjectId, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['cardio', 'olympic_weightlifting', 'plyometrics', 'powerlifting', 'strength', 'stretching', 'strongman'], required: true },
    muscle: { type: String, enum: ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'], required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)