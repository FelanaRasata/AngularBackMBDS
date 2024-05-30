import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { toBaseModel } from '../shared/utils/mongooseUtils.js';


const assignmentSchema = new mongoose.Schema(
    toBaseModel({
        title: { type: String, required: true },
        student: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        subject: { type: mongoose.Types.ObjectId, ref: 'Subject', required: true },
        dateSending: { type: Date, default: () => new Date() },
        score: { type: Number, required: true, default: 0 },
        remark: { type: String, default: '' },
        confirm: { type: Boolean, default: false },
    }),
    {
        timestamps: true,
    },
);

assignmentSchema.plugin(paginate);
assignmentSchema.plugin(aggregatePaginate);


const AssignmentModel = mongoose.model('Assignment', assignmentSchema, 'assignments');

export default AssignmentModel;
