const { Command } = require("commander");

const program = new Command();

const contactsService = require('./contacts');
 
const invokeAction = async ({ action, id, name, email, phone}) => {
    switch (action) {
        case "list": 
            const allContacts = await contactsService.getListContacts();
            return console.log(allContacts);
        case "get":
            const contact = await contactsService.getContactById(id);
            return console.log(contact);
        case "add":
            const newContact = await contactsService.addContact(name, email, phone);
            return console.log(newContact);
        case "remove":
            const deleteContact = await contactsService.removeContact(id);
            return console.log(deleteContact);
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
  
invokeAction(argv);

// invokeAction({action: "getAll"})
// invokeAction({action: "getById", id: "1DEXoP8AuCGYc1YgoQ6hw"})