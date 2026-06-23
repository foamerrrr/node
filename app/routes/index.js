import router from "./app/routes/index.js";
// Ajout des routes avant « export default app; »
app.use("/api", router);

import express from 'express';
const router = express.router();
import userRoutes from "./user.js";

router.use("/auth", userRoutes);

export default router;

import express from 'express';
const router = express();

router.post('/signup', function (req, res) {
res.send('You are signup');
});
router.post('/login', function (req, res) {
res.send('You are login');
});

export default router;