import express from 'express';
import ApiResponse from '../shared/http/apiResponse.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';
import AssignmentsService from '../services/assignments.service.js';
import { authenticate } from '../middlewares/authentication.middleware.js';


const router = express.Router();

router.get('/', authenticate, async function (req, res) {

    try {

        const user = req.user;
        const result = await AssignmentsService.get({ options: req.query, user });

        res.send(
            ApiResponse.success({
                ...HTTP_STATUS.SUCCESS,
                data: result,
            }),
        );

    } catch (error) {

        res.send(ApiResponse.error(error));

    }

});

router.get('/:assignmentId', authenticate, async function (req, res) {

    try {

        const assignmentId = req.params['assignmentId'];
        const result = await AssignmentsService.getOne({ _id: assignmentId });

        res.send(
            ApiResponse.success({
                ...HTTP_STATUS.SUCCESS,
                data: result,
            }),
        );

    } catch (error) {

        res.send(ApiResponse.error(error));

    }

});

router.post('/', authenticate, async function (req, res) {

    try {

        const student = req.user;

        const result = await AssignmentsService.create({
            payload: req.body,
            student,
        });

        res.send(
            ApiResponse.success({
                ...HTTP_STATUS.CREATED,
                data: result,
            }),
        );

    } catch (error) {

        res.send(ApiResponse.error(error));

    }

});

router.put('/:assignmentId', authenticate, async function (req, res) {

    try {

        const assignmentId = req.params['assignmentId'];
        const teacher = req.user;

        await AssignmentsService.update({
            assignmentId,
            payload: req.body,
            teacher,
        });

        res.send(
            ApiResponse.success(HTTP_STATUS.NO_CONTENT),
        );

    } catch (error) {

        res.send(ApiResponse.error(error));

    }

});

router.delete('/:assignmentId', authenticate, async function (req, res) {

    try {

        const assignmentId = req.params['assignmentId'];
        const teacher = req.user;

        await AssignmentsService.delete({
            assignmentId,
            teacher,
        });

        res.send(
            ApiResponse.success(HTTP_STATUS.NO_CONTENT),
        );

    } catch (error) {

        res.send(ApiResponse.error(error));

    }

});

const assignmentsRoute = {
    router,
    path: 'assignments',
};

export default assignmentsRoute;