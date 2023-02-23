const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: { type: String, required: true},
    details: { type: String, required: true},
    isCompleted: { type: Boolean, default: false, required:false },
    user_id:{type:String,required:true}
  },
  { timestamps: true }
);


module.exports = mongoose.model("Todo", todoSchema);
