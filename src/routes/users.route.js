import express from 'express';
import SessionService from '../services/session.service.js';
import ApiResponse from '../shared/http/apiResponse.js';
import HTTP_STATUS from '../shared/http/httpStatus.js';
import { authenticate } from '../middlewares/authentication.middleware.js';


const router = express.Router();
const path = 'users';

router.get('/login', async function (req, res) {

    try {

        const credentials = req.body;
        const result = await SessionService.signIn(credentials);

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

router.get('/current', authenticate, async function (req, res) {

    try {

        const currentUser = req.user;

        res.send(
            ApiResponse.success({
                ...HTTP_STATUS.SUCCESS,
                data: currentUser,
            }),
        );

    } catch (error) {

        res.send(ApiResponse.error(error));

    }

});

const usersRoute = {
    router,
    path,
};

export default usersRoute;