import UserEntity from "./entities/user.entity.js";
import {assignmentList, subjectList, userList} from "./shared/utils/data.js";
import SubjectEntity from "./entities/subject.entity.js";
import AssignmentEntity from "./entities/assignment.entity.js";
import bcrypt from "bcrypt";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


export async function init() {

    const usersInserted = await UserEntity.find({})

    if (usersInserted.length === 0) {

        const userPromises = userList.map(async user => {
            // Random additional data
            const salt = await bcrypt.genSalt(10);

            // Replace the password with the hash
            user.password = await bcrypt.hash(user.password, salt);

            return user;
        })

        const users = await Promise.all(userPromises);

        await UserEntity.insertMany(users)

        const teachers = await UserEntity.find({role: 'TEACHER'})

        console.log("teachers : ", teachers.length)

        for (let subject of subjectList) {
            subject.teacher = teachers[getRandomInt(teachers.length)];
        }

        const subjects = await SubjectEntity.insertMany(subjectList)

        console.log("subjects : ", subjects.length)

        const students = await UserEntity.find({role: 'STUDENT'});

        for (let assignment of assignmentList) {
            assignment.subject = subjects[getRandomInt(subjects.length)]
            assignment.student = students[getRandomInt(students.length)]
        }

        const assignments = await AssignmentEntity.insertMany(assignmentList)

        console.log("assignments : ", assignments.length)

    }


}
