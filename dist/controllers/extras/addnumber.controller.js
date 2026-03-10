import { executive_emails, grouplist } from '../../local_dbs.js';
const addnumber = async (req, res) => {
    const email = req.body.email;
    if (!executive_emails.includes(email)) {
        res.status(402).send("Failed to add the new group");
        return;
    }
    const groupName = req.body.name;
    const groupDescription = req.body.description;
    const existing_group = grouplist.find((num) => num.name == groupName);
    if (existing_group) {
        existing_group.visibility = 'none';
        existing_group.description = groupDescription;
    }
    else {
        grouplist.push({
            name: groupName,
            description: groupDescription,
            visibility: 'none'
        });
    }
    res.status(200).send("Added the New Group Successfully");
};
export default addnumber;
