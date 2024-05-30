import SubjectModel from '../entities/subject.entity.js';
import { isEmpty } from '../shared/utils/tools.js';


const SubjectsService = {
    get: async function ({ filters }) {

        return SubjectModel.find(
            {
                ...isEmpty(filters) ? {} : filters,
                deleted: false,
            },
        );

    },
};

export default SubjectsService;
