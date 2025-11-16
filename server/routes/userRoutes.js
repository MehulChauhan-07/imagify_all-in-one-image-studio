import express from 'express'
import { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay } from '../controller/userController.js'
import userAuth from '../middleware/auth.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
// Support both POST and GET for fetching credits (body is not required; user id comes from auth middleware)
userRouter.post('/credits', userAuth, userCredits)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/pay-razor', userAuth, paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay);

export default userRouter