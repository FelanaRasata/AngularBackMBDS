import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { toBaseModel } from '../utils/mongodb.tools.js';
import { isEmpty } from '../utils/tools.js';
import bcrypt from 'bcrypt';
import Loggeo from '../utils/log.tools.js';


export const EUserRole = {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
};

const userSchema = new mongoose.Schema(
    toBaseModel({
        name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: Object.values(EUserRole), default: EUserRole.STUDENT },
    }),
    {
        timestamps: true,
    },
);


/**
 * This code contains code from internet
 * */
userSchema.pre('save', async function (next) {

    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password') || isEmpty(this.password)) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(10);

    // Replace the password with the hash
    this.password = await bcrypt.hash(this.password, salt);

    return next();

});

userSchema.methods.comparePassword = async function (pwdToCompare) {

    try {

        return await bcrypt.compare(pwdToCompare, this.password);

    } catch (error) {

        Loggeo.error(error);

        return false;

    }

};


userSchema.plugin(paginate);


const UserModel = mongoose.model('assignments', userSchema);

export default UserModel;
