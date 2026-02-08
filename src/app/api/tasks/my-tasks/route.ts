import { getUserFromSession } from '@/lib/session';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: user.id,
      },
      include: {
        property: {
          select: {
            id: true,
            name: true,
          },
        },
        booking: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
          },
        },
      },
      orderBy: { dueDate: 'asc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('My tasks error:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
