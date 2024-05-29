import UserModel from './entities/user.entity.js';
import SubjectModel from './entities/subject.entity.js';
import AssignmentModel from './entities/assignment.entity.js';
import Loggeo from './shared/utils/logger.js';
import bcrypt from 'bcrypt';


function getRandomInt(max) {

    return Math.floor(Math.random() * max);

}


export async function init() {

    try {

        const usersInserted = await UserModel
            .find({});

        if (usersInserted.length > 0) return;

        Loggeo.info('>>>>>>>>>> LOADING DATA <<<<<<<<<<');

        const {
            userList,
            subjectList,
            assignmentList,
        } = await getTestData();

        await UserModel.insertMany(userList);

        const teachers = await UserModel.find({ role: 'TEACHER' });

        for (let subject of subjectList) {
            subject.teacher = teachers[getRandomInt(teachers.length)]._id;
        }

        const subjects = await SubjectModel.insertMany(subjectList);
        const students = await UserModel.find({ role: 'STUDENT' });

        for (let assignment of assignmentList) {
            assignment.subject = subjects[getRandomInt(subjects.length)]._id;
            assignment.student = students[getRandomInt(students.length)]._id;
        }

        await AssignmentModel.insertMany(assignmentList);

        Loggeo.info('>>>>>>>>>> END - LOADING DATA <<<<<<<<<<');

    } catch (error) {

        Loggeo.error('IMPOSSIBLE TO INSERT DEFAULT DATA');
        Loggeo.error(error);

    }

}


async function getTestData() {

    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash('pwd123', salt);

    const userList = [
        {
            role: 'TEACHER', username: 'btodarini0@smugmug.com', password, name: 'Bernadette Todarini',
        },
        { role: 'TEACHER', username: 'dburnall1@wikia.com', password, name: 'Dietrich Burnall' },
        {
            role: 'STUDENT', username: 'gmingotti2@arstechnica.com', password, name: 'Garner Mingotti',
        },
        { role: 'STUDENT', username: 'wlindroos3@cnn.com', password, name: 'Wren Lindroos' },
        {
            role: 'STUDENT', username: 'fgabbott4@tripadvisor.com', password, name: 'Federico Gabbott',
        },
    ];

    const subjectList = [
        {
            title: 'Maths', image: 'http://dummyimage.com/241x100.png/5fa2dd/ffffff',
        },
        {
            title: 'Physics', image: 'http://dummyimage.com/172x100.png/dddddd/000000',
        },
    ];

    const assignmentList = [
        {
            title: 'Fliptune', score: 20, remark: 'Mitsubishi', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Miboo', score: 16, remark: 'Dodge', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Yambee', score: 11, remark: 'Kia', confirm: true, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Brightdog', score: 14, remark: 'GMC', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Centizu', score: 18, remark: 'Pontiac', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Jazzy', score: 12, remark: 'Toyota', confirm: true, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Feedfire', score: 16, remark: 'Volvo', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Zooxo', score: 17, remark: 'Eagle', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Tambee', score: 11, remark: 'Jaguar', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Tagcat', score: 10, remark: 'Ford', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Yata', score: 13, remark: 'Land Rover', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Realfire', score: 12, remark: 'Dodge', confirm: false, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'BlogXS', score: 10, remark: 'Lotus', confirm: true, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Fatz', score: 15, remark: 'Scion', confirm: true, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Buzzbean', score: 14, remark: 'Acura', confirm: true, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Tazz', score: 16, remark: 'BMW', confirm: true, dateSending: new Date('11/9/2023'),
        },
        {
            title: 'Skajo', score: 14, remark: 'Eagle', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Quatz', score: 18, remark: 'Land Rover', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Geba', score: 12, remark: 'Toyota', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Bubblebox', score: 17, remark: 'Ford', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Quimba', score: 13, remark: 'Mercury', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Feedfire', score: 14, remark: 'Dodge', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Wikivu', score: 14, remark: 'Hummer', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Yodo', score: 17, remark: 'Audi', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Dabvine', score: 18, remark: 'Mitsubishi', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Jatri', score: 14, remark: 'Ford', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Realblab', score: 17, remark: 'BMW', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Eimbee', score: 19, remark: 'Aston Martin', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Skinte', score: 16, remark: 'BMW', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Jabbercube', score: 18, remark: 'Subaru', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Brainsphere', score: 11, remark: 'Mitsubishi', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Brightbean', score: 12, remark: 'Acura', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Zoomcast', score: 20, remark: 'Dodge', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Eazzy', score: 16, remark: 'Ford', confirm: false, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Yodo', score: 14, remark: 'Audi', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Edgepulse', score: 19, remark: 'Mazda', confirm: true, dateSending: new Date('6/30/2023'),
        },
        {
            title: 'Photobug', score: 13, remark: 'Mazda', confirm: false, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Skinix', score: 13, remark: 'GMC', confirm: false, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Cogilith', score: 10, remark: 'Suzuki', confirm: true, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Thoughtblab', score: 14, remark: 'Daewoo', confirm: false, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Mymm', score: 11, remark: 'Toyota', confirm: false, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Feedfire', score: 17, remark: 'Dodge', confirm: true, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Zazio', score: 13, remark: 'Land Rover', confirm: false, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Omba', score: 14, remark: 'Chevrolet', confirm: true, dateSending: new Date('12/17/2023'),
        },
        {
            title: 'Youspan', score: 15, remark: 'Mercury', confirm: true, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Oyoloo', score: 11, remark: 'Volkswagen', confirm: false, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Roomm', score: 13, remark: 'Lexus', confirm: false, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Jayo', score: 16, remark: 'Citroën', confirm: false, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Edgewire', score: 17, remark: 'Land Rover', confirm: true, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Gabtype', score: 10, remark: 'Audi', confirm: true, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Realbuzz', score: 19, remark: 'Toyota', confirm: false, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Zoonder', score: 12, remark: 'Dodge', confirm: false, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Tambee', score: 16, remark: 'Toyota', confirm: true, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Fadeo', score: 16, remark: 'Dodge', confirm: false, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Kwimbee', score: 20, remark: 'Infiniti', confirm: true, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Babbleopia', score: 19, remark: 'Mercedes-Benz', confirm: false, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Teklist', score: 17, remark: 'Lincoln', confirm: true, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Tagcat', score: 15, remark: 'Mercedes-Benz', confirm: true, dateSending: new Date('7/1/2023'),
        },
        {
            title: 'Kwideo', score: 11, remark: 'Lotus', confirm: true, dateSending: new Date('7/1/2023'),
        },
    ];

    return {
        userList,
        subjectList,
        assignmentList,
    };

}