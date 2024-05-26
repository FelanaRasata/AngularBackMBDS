import AssigmentModel from '../entities/assignment.entity.js';
import { CUSTOM_LABELS } from '../shared/utils/mongooseUtils.js';


export async function getAssignments(
    {
        query,
        page,
        limit,
    },
) {

    const options = {
        page,
        limit,
        lean: true,
        allowDiskUse: true,
        customLabels: CUSTOM_LABELS,
    };

    return AssigmentModel.paginate(query, options);

}


// Récupérer un assignment par son id (GET)
export async function getAssignment(assignmentId) {

    return AssigmentModel.findOne({ _id: assignmentId })

}


// Ajout d'un assignment (POST)
export function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log('POST assignment reçu :');
    console.log(assignment);

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!` });
    });
}


// Update d'un assignment (PUT)
export function updateAssignment(req, res) {
    console.log('UPDATE recu assignment : ');
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({ message: 'updated' });
        }

        // console.log('updated ', assignment)
    });

}


// suppression d'un assignment (DELETE)
// l'id est bien le _id de mongoDB
export function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${assignment.nom} deleted` });
    });
}