 export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };