const { Router } = require("express");
const errorCont = require("../controllers/errorController");
const User = require("../models/user");
const userRouter = Router();

//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `A user with that ${field} already exists.`;
  res.status(code).send({ messages: error, fields: field });
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(" ");
    res.status(code).send({ messages: formattedErrors, fields: fields });
  } else {
    res.status(code).send({ messages: errors, fields: fields });
  }
};

//error controller function
module.exports = (err, req, res, next) => {
  try {
    if (err.name === "ValidationError")
      return (err = handleValidationError(err, res));
    if (err.code && err.code == 11000)
      return (err = handleDuplicateKeyError(err, res));
  } catch (err) {
    res.status(500).send("An unknown error occurred.");
  }
};

const userView = (user) => {
  const { _id, fullName, email, password, created } = user;
  return { _id, fullName, email, password, created };
};

userRouter.get("/getAll", (req, res) => {
  res.json(
    User.find({}, (err, users) => {
      if (err) next(err);
      else {
        res.status(200).json(users.map((user) => userView(user)));
      }
    })
  );
});

userRouter.post("/create", async (req, res, next) => {
  console.log(req.body);

  const { fullName, email, password } = req.body;

  const user = new User({ fullName, email, password });

  try {
    let validations = user.validateSync();
    if (validations) {
      res.status(401).json(validations.errors);
      return;
    }
    res.status(201).json(userView(await user.save()));
  } catch (err) {
    next(err);
  }
});

userRouter.put("/edit", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!email) {
      return res.status(401).json({ error: "email id is required" });
    }

    if (!fullName && !password) {
      return res
        .status(401)
        .json({ error: "either fullName or password is required" });
    }

    let user = await User.findOne({ email }).exec();

    if (!user) {
      return res
        .status(401)
        .json({ error: "User with email " + email + " not found." });
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (password) {
      user.password = password;
    }

    res.status(201).json(userView(await user.save()));
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/delete", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOneAndDelete({ email }).exec();

    if (user) {
      res.json({ deleted: userView(user) });
    } else {
      res
        .status(401)
        .json({ error: "user with email " + email + " not found." });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.use(errorCont);

module.exports = userRouter;
