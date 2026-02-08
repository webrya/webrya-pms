import { getUserFromSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(1),
});

export async function PUT(req: Request) {
  try {
    const currentUser = await getUserFromSession();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name } = profileSchema.parse(body);

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Profile update error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
