const { Contact } = require('../models');
const nodemailer = require('nodemailer');

// Set up Nodemailer transporter using environment variables or placeholders
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'empireesttates@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password-here'
  }
});

exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, projectIdea } = req.body;

    // 1. Save to Database
    const newContact = await Contact.create({
      firstName,
      lastName,
      phone,
      email,
      projectIdea
    });

    // 2. Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'empireesttates@gmail.com',
      to: 'empireesttates@gmail.com', // Sending to the admin
      subject: `New Contact Inquiry from ${firstName} ${lastName || ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${projectIdea}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        // We still return success for the contact creation, even if email fails, 
        // or we could handle it differently.
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Contact submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
