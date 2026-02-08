import { NextResponse } from 'next/server';
import { getUserFromSession } from '@/lib/session';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const properties = await prisma.property.count({
      where: { ownerId: user.id },
    });

    const bookings = await prisma.booking.count({
      where: {
        property: { ownerId: user.id },
        endDate: { gte: new Date() },
      },
    });

    const pendingTasks = await prisma.task.count({
      where: {
        property: { ownerId: user.id },
        status: { in: ['open', 'in_progress'] },
      },
    });

    const completedTasks = await prisma.task.count({
      where: {
        property: { ownerId: user.id },
        status: 'completed',
      },
    });

    return NextResponse.json({
      properties,
      bookings,
      pendingTasks,
      completedTasks,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
