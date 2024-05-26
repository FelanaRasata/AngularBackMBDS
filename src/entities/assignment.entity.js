import mongoose, { mongo } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { toBaseModel } from '../utils/mongodb.tools.js';


const assignmentSchema = new mongoose.Schema(
    toBaseModel({
        title: { type: String, required: true },
        student: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        subject: { type: mongoose.Types.ObjectId, ref: 'Subject', required: true },
        dateSending: { type: Date, required: true },
        score: { type: Number, required: true },
        remark: { type: String, required: true },
        confirm: { type: Boolean, required: true, default: false },
    }),
    {
        timestamps: true,
    },
);

assignmentSchema.plugin(paginate);


const AssigmentModel = mongoose.model('assignments', assignmentSchema);

export default AssigmentModel;
