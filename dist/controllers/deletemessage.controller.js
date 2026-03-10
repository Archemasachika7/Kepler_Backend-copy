import talkcollection from "../models/talkcollection.model.js";
import { executive_emails } from "../local_dbs.js";
const deletefunc = async (req, res) => {
    const { removerEmail, groupName, dateToDelete, removedEmail } = req.body;
    if (removedEmail != removerEmail && !executive_emails.includes(removerEmail)) {
        res.status(402).send("InEligible for Deletion of this message");
        return;
    }
    const data = await talkcollection.deleteOne({
        group_name: groupName,
        date: dateToDelete,
        email: removedEmail
    });
    res.status(200).send("Deleted");
};
export { deletefunc };
