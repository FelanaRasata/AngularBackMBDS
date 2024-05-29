import AssignmentModel from '../entities/assignment.entity.js';
import { CUSTOM_LABELS } from '../shared/utils/mongooseUtils.js';


const SubjectsService = {
    get: async function ({ page, limit, ...filters }) {

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
            },
        );

    },
};

export default SubjectsService;
