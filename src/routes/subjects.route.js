import express from 'express';
import ApiResponse from '../shared/http/apiResponse.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';
import SubjectsService from '../services/subjects.service.js';
import { authenticate } from '../middlewares/authentication.middleware.js';


const router = express.Router();
const path = 'subjects';

router.get('/', authenticate, async function (req, res) {

    try {

        const result = await SubjectsService.get(req.query);

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

const subjectsRoute = {
    router,
    path,
};

export default subjectsRoute