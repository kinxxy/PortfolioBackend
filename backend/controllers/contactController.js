const Contact = require('../models/contact');

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving contacts", error });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving contact", error });
    }
};

exports.addContact = async (req, res) => {
    try {
        const { firstname, lastname, email } = req.body;
        const newContact = new Contact({ firstname, lastname, email });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: "Error adding contact", error });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: "Error updating contact", error });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error });
    }
};

exports.deleteAllContacts = async (req, res) => {
    try {
        await Contact.deleteMany();
        res.json({ message: "All contacts deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contacts", error });
    }
};
