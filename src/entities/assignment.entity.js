import mongoose, { mongo } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { toBaseModel } from '../shared/utils/mongooseUtils.js';


const assignmentSchema = new mongoose.Schema(
    toBaseModel({
        title: { type: String, required: true },
        student: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        subject: { type: mongoose.Types.ObjectId, ref: 'Subject', required: true },
        dateSending: { type: Date, required: true, default: () => new Date() },
        score: { type: Number, required: true, default: 0 },
        remark: { type: String, required: true, default: '' },
        confirm: { type: Boolean, required: true, default: false },
    }),
    {
        timestamps: true,
    },
);

assignmentSchema.plugin(paginate);


const AssignmentModel = mongoose.model('assignments', assignmentSchema);

export default AssignmentModel;
