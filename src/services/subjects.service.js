import SubjectModel from '../entities/subject.entity.js';
import { CUSTOM_LABELS } from '../shared/utils/mongooseUtils.js';
import { isEmpty } from '../shared/utils/tools.js';


const SubjectsService = {
    get: async function ({ page, limit, ...filters }) {

        const options = {
            lean: true,
            customLabels: CUSTOM_LABELS,
        };


        if (!isEmpty(page) && !isEmpty(limit)) {
            options.page = page;
            options.limit = limit;
        }

        return SubjectModel.paginate(
            {
                ...filters,
                deleted: false,
            },
            options,
        );

    },
};

export default SubjectsService;
