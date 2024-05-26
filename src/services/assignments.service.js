import { CUSTOM_LABELS } from '../shared/utils/mongooseUtils.js';
import AssignmentModel from '../entities/assignment.entity.js';
import { isEmpty } from '../shared/utils/tools.js';
import { HttpException } from '../shared/exception/httpException.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';
import { EUserRole } from '../entities/user.entity.js';


const AssignmentsService = {
    get: async function ({ page, limit,  ...filters }) {

        return AssignmentModel.paginate(
            {
                ...filters,
                deleted: false,
            },
            {
                page,
                limit,
                lean: true,
                customLabels: CUSTOM_LABELS,
                populate: ['student', 'subject'],
            },
        );

    },
    getOne: async function (query) {

        if (isEmpty(query)) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'Missing query on assignments.');

        return AssignmentModel
            .findOne(query)
            .populate(['student', 'subject'])
            .lean();

    },
    create: async function ({ payload, student }) {

        if (isEmpty(payload)) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'No content to save.');

        if (student.role !== EUserRole.STUDENT) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'A teacher can\'t create an assignment.');

        const {
            title,
            subject,
        } = payload;

        const assignment = new AssignmentModel();

        assignment.title = title;
        assignment.student = student._id;
        assignment.subject = subject;

        await assignment.save();

        return assignment;

    },
    update: async function ({ assignmentId, payload, teacher }) {

        if (isEmpty(payload)) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'No assignment to update.');

        if (teacher.role !== EUserRole.TEACHER) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'A student can\'t create an assignment.');

        const {
            student,
            confirm,
            score,
            remark,
        } = payload;

        const {
            acknowledged,
            matchedCount,
            modifiedCount,
        } = await AssignmentModel.updateOne(
            { _id: assignmentId, student, confirm: false },
            { $set: { confirm, score, remark } },
        );

        if (!acknowledged || matchedCount === 0 || modifiedCount === 0) HttpException.throw(HTTP_STATUS.NOT_FOUND_ERROR, 'No assignment found.');

    },
    delete: async function ({ assignmentId, teacher }) {

        if (isEmpty(assignmentId)) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'No assignment to remove.');

        if (teacher.role !== EUserRole.TEACHER) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'A student can\'t delete an assignment.');

        const {
            acknowledged,
            matchedCount,
            modifiedCount,
        } = await AssignmentModel.updateOne(
            { _id: assignmentId },
            { $set: { deleted: true } },
        );

        if (!acknowledged || matchedCount === 0 || modifiedCount === 0) HttpException.throw(HTTP_STATUS.NOT_FOUND_ERROR, 'No assignment found.');

    },
};

export default AssignmentsService;