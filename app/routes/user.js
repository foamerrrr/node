import express from 'express';
const router = express.Router();
 
router.post('/signup', function (req, res) {
  res.send('You are signed up');
});
 
router.post('/login', function (req, res) {
  res.send('You are logged in');
});
 
export default router;
 