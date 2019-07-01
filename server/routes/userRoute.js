import express from 'express';
import Users from '../controllers/user';

// middlewares
import ValidateUsers from '../middleWares/validateUser';

const router = express.Router();

router.route('/').get(Users.getUsers);
router.route('/').post(
  ValidateUsers.checkIsEmpty,
  ValidateUsers.checkPasswordLength,
  ValidateUsers.checkLowerCase,
  ValidateUsers.checkUpperCase,
  ValidateUsers.checkNumber,
  ValidateUsers.checkMail,
  ValidateUsers.checkPassword,
  ValidateUsers.checkDuplicatMail,
  ValidateUsers.checkDuplicateUserName,
  Users.createUser
);

export default router;
