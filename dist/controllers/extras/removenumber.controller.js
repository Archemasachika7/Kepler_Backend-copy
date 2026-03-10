import { executive_emails, grouplist } from '../../local_dbs.js';
const removenumber = async (req, res) => {
    const email = req.body.email;
    if (!executive_emails.includes(email)) {
        res.status(403).send("You are not an Admin.");
        return;
    }
    var removeGroup = req.body.groupName;
    const index = grouplist.findIndex(item => item.name == removeGroup);
    grouplist[index].visibility = 'hidden';
    res.status(200).send("Done");
};
export default removenumber;
