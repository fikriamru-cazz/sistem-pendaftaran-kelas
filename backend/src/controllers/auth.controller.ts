 import { Request, Response } from 'express';
      import { PrismaClient } from '@prisma/client';
      import bcrypt from 'bcryptjs';
      import jwt from 'jsonwebtoken';

      const prisma = new PrismaClient();

      export const register = async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
          });

          const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
          );

          res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
          });
        } catch (error) {
          res.status(400).json({ message: 'User already exists or invalid data' });
        }
      };

      export const login = async (req: Request, res: Response) => {
        console.log("--- PROSES LOGIN DIMULAI ---");
        const { email, password } = req.body;

        try {
          console.log(1. Mencari pengguna dengan email: ${email});
          const user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            console.log("--> GAGAL: Pengguna tidak ditemukan.");
            return res.status(401).json({ message: 'Invalid credentials' });
          }
          console.log("--> SUKSES: Pengguna ditemukan.");

          console.log("2. Membandingkan password...");
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            console.log("--> GAGAL: Password tidak cocok.");
            return res.status(401).json({ message: 'Invalid credentials' });
          }
          console.log("--> SUKSES: Password cocok.");

          console.log("3. Membuat JWT Token...");
          const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
          );
          console.log("--> SUKSES: Token dibuat.");
          console.log("--- PROSES LOGIN SELESAI ---");

          res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
          });

        } catch (error) {
          console.error("!!! KESALAHAN KRITIS DI BLOK CATCH !!!", error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
