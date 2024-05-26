import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { toBaseModel } from '../utils/mongodb.tools.js';


const subjectSchema = new mongoose.Schema(
    toBaseModel({
        title: { type: String, required: true },
        image: { type: String, required: true },
        teacher: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    }),
    {
        timestamps: true,
    },
);

subjectSchema.plugin(paginate);


const SubjectModel = mongoose.model('subjects', subjectSchema);

export default SubjectModel;
