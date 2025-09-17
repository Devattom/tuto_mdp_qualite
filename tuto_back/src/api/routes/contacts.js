const express = require("express");
const { Contact } = require("../models/index");
const router = express.Router();
const {
  isValidPhoneNumber,
  isValidEmail,
  sanitizePhone,
} = require("../tools/validator");
const { ValidationError } = require("sequelize");

router.get("/contacts", (req, res) => {
  Contact.findAll()
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

  if (!isValidPhoneNumber(updatedData.phone)) {
    return res
      .status(400)
      .json({ message: "Le format du numéro de téléphone n'est pas correct" });
  }

  if (!isValidEmail(updatedData.email)) {
    return res
      .status(400)
      .json({ message: "Le format du mail n'est pas correct" });
  }

  updatedData.phone = sanitizePhone(updatedData.phone);
  
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
        return res.json({ message: `Contact ${contactId} mis à jour !`, contact: {...updatedData, id: contactId} });
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

module.exports = router;
