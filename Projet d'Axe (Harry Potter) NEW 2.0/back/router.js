import express from 'express'
import AuthRoutes from './routes/AuthRoutes.js'
import drawRoutes from './routes/drawRoutes.js'

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/draw', drawRoutes);

export default router