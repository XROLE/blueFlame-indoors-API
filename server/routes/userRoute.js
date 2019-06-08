import express from 'express';
import Users from '../controllers/user';

const router = express.Router();

router.route('/').get(Users.getUsers);

export default router;
