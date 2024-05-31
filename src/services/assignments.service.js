import { CUSTOM_LABELS } from '../shared/utils/mongooseUtils.js';
import AssignmentModel from '../entities/assignment.entity.js';
import { isEmpty } from '../shared/utils/tools.js';
import { HttpException } from '../shared/exception/httpException.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';
import { EUserRole } from '../entities/user.entity.js';


const AssignmentsService = {
    get: async function ({ options, user }) {

        const { page, limit, search, confirmed } = options;

        let searchOptions = {
            deleted: false,
        };

        if (!isEmpty(search)) {
            const searchRegex = new RegExp(search, 'i');

            searchOptions = {
                $or: [
                    { title: searchRegex },
                    { remark: searchRegex },
                ],
            };
        }

        if (!isEmpty(confirmed))
            searchOptions.confirm = confirmed === 'true';

        if (user.role === EUserRole.TEACHER) {

            searchOptions['subject.teacher'] = user._id;

            const aggregateOptions = [
                {
                    $lookup: {
                        from: 'subjects',
                        localField: 'subject',
                        foreignField: '_id',
                        as: 'subject',
                    },
                },
                {
                    $unwind: '$subject',
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'student',
                        foreignField: '_id',
                        as: 'student',
                    },
                },
                {
                    $unwind: '$student',
                },
                {
                    $match: searchOptions,
                },
                {
                    $project: {
                        deleted: 0,
                        __v: 0,
                        'student.deleted': 0,
                        'student.password': 0,
                        'student.__v': 0,
                        'subject.deleted': 0,
                        'subject.__v': 0,
                    },
                },
            ];

            const aggregate = AssignmentModel.aggregate(aggregateOptions);

            return AssignmentModel.aggregatePaginate(
                aggregate,
                {
                    page,
                    limit,
                    customLabels: CUSTOM_LABELS,
                },
            );

        }

        searchOptions.student = user._id;

        return AssignmentModel.paginate(
            searchOptions,
            {
                select: ['-deleted', '-__v'],
                page,
                limit,
                customLabels: CUSTOM_LABELS,
                populate: [
                    {
                        path: 'student',
                        select: ['-password', '-deleted', '-__v'],
                    },
                    {
                        path: 'subject',
                        select: ['-deleted', '-__v'],
                    },
                ],
            },
        );

    },
    getOne: async function (query) {

        if (isEmpty(query)) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'Missing query on assignments.');

        return AssignmentModel
            .findOne(query)
            .populate(['student', 'subject']);

    },
    create: async function ({ payload, student }) {

        if (student.role !== EUserRole.STUDENT) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'A teacher can\'t create an assignment.');

        if (isEmpty(payload)) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'No content to save.');

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

        if (teacher.role !== EUserRole.TEACHER) HttpException.throw(HTTP_STATUS.BAD_REQUEST_ERROR, 'A student can\'t update an assignment.');

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
            { _id: assignmentId, student: student._id, confirm: false },
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