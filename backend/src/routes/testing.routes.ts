import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// @route   POST /api/testing/reset-user
// @desc    Resets the registrations for a specific user. FOR TESTING ONLY.
router.post('/reset-user', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const { count } = await prisma.registration.deleteMany({
        where: { userId: user.id },
      });
      res.status(200).json({ message: `Successfully deleted ${count} registrations for ${email}.` });
    } else {
      res.status(404).json({ message: `User with email ${email} not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

export default router;
