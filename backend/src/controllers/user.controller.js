import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      // Explicitly select fields to exclude password
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        _count: {
          select: { registrations: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
