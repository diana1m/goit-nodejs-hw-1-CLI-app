const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, 'db/contacts.json');

const getListContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}
  
const getContactById = async (contactId )=> {
    const contacts = await getListContacts();
    const currentContact = contacts.find(contact => contact.id === contactId);
    return currentContact || null;
}
  
const removeContact = async (contactId) => {
    const contacts = await getListContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
const addContact = async (name, email, phone) => {
    const contacts = await getListContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

module.exports = {
    getListContacts,
    getContactById,
    removeContact,
    addContact,
}