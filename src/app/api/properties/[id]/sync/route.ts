import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { parseICalFeed } from '@/lib/ical';
import { addDays } from 'date-fns';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const property = await prisma.property.findFirst({
      where: { id: params.id, ownerId: session.user.id },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    if (!property.icalUrl) {
      return NextResponse.json({ error: 'No iCal URL configured' }, { status: 400 });
    }

    // Parse iCal feed
    const events = await parseICalFeed(property.icalUrl);

    let newBookings = 0;
    let newTasks = 0;

    for (const event of events) {
      // Check if booking already exists
      const existing = await prisma.booking.findUnique({
        where: { externalUid: event.uid },
      });

      if (!existing) {
        // Create booking
        const booking = await prisma.booking.create({
          data: {
            propertyId: property.id,
            externalUid: event.uid,
            startDate: event.startDate,
            endDate: event.endDate,
            summary: event.summary,
            source: 'iCal',
          },
        });
        newBookings++;

        // Auto-create cleaning task
        const dueDate = addDays(event.endDate, 1);
        await prisma.task.create({
          data: {
            propertyId: property.id,
            bookingId: booking.id,
            title: 'Cleaning after checkout',
            dueDate,
            status: 'open',
          },
        });

        // Create activity
        await prisma.taskActivity.create({
          data: {
            taskId: (await prisma.task.findFirst({
              where: { bookingId: booking.id },
              select: { id: true },
            }))!.id,
            userId: session.user.id,
            action: 'created',
            description: 'Task auto-generated from booking',
          },
        });

        newTasks++;
      }
    }

    return NextResponse.json({
      success: true,
      newBookings,
      newTasks,
      totalEvents: events.length,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync bookings', details: (error as Error).message },
      { status: 500 }
    );
  }
}
