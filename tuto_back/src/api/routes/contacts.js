const express = require("express");
const { Contact } = require("../models/index");
const router = express.Router();
const {
  validatePhoneAndMail,
  sanitizePhone,
} = require("../tools/validator");
const { ValidationError } = require("sequelize");

router.get("/contacts", (req, res) => {
  Contact.findAll({
    order: [["id", "DESC"]],
  })
    .then((contacts) => {
      res.json({ data: contacts });
    })
    .catch((error) => {
      const message = "La liste de contact n'a pas pu être récupérée";
      res.status(404).json({ message, error });
    });
});

router.delete("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  Contact.destroy({
    where: {
      id: contactId,
    },
  })
    .then((_) =>
      res.json({ message: `Le contact ${contactId} a bien été supprimé` })
    )
    .catch((error) =>
      res.status(404).json({ message: `Erreur lors de la supression`, error })
    );
});

router.put("/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id);
  const updatedData = { ...req.body };

  delete updatedData.id;

  try {
    validatePhoneAndMail(updatedData.phone, updatedData.email);
  } catch(error) {
    return res
      .status(400)
      .json({ message: error.message });
  }

  updatedData.phone = updatedData.phone ? sanitizePhone(updatedData.phone) : null;

  Contact.findByPk(contactId)
    .then((contact) => {
      if (!contact) {
        return res.status(404).json({ message: "Contact non trouvé" });
      }

      return Contact.update(updatedData, {
        where: {
          id: contactId,
        },
      }).then((_) => {
        return res.json({
          message: `Contact ${contactId} mis à jour !`,
          contact: { ...updatedData, id: contactId },
        });
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res
          .status(400)
          .json({ message: "Erreur de validation des champs", error });
      }

      return res.status(400).json({ message: "Bad Request", error: error });
    });
});

router.post("/contacts", (req, res) => {
  const contact = req.body;

  try {
    validatePhoneAndMail(contact.phone, contact.email);
  } catch(error) {
    return res
      .status(400)
      .json({ message: error.message });
  }

  contact.phone = contact.phone ? sanitizePhone(contact.phone) : null;

  Contact.create(contact)
    .then((newContact) => {
      return res.json({
        message: "Contact créer avec succés",
        contact: newContact.dataValues,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Une erreur est survenue lors de la création",
        error,
      });
    });
});

module.exports = router;
