import ICAL from 'ical.js';

export interface ICalEvent {
  uid: string;
  startDate: Date;
  endDate: Date;
  summary: string;
}

export async function parseICalFeed(url: string): Promise<ICalEvent[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch iCal feed: ${response.status}`);
    }

    const icalData = await response.text();
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents('vevent');

    const events: ICalEvent[] = [];

    for (const vevent of vevents) {
      const event = new ICAL.Event(vevent);
      
      if (!event.startDate || !event.endDate) continue;

      events.push({
        uid: event.uid,
        startDate: event.startDate.toJSDate(),
        endDate: event.endDate.toJSDate(),
        summary: event.summary || 'Booking',
      });
    }

    return events;
  } catch (error) {
    console.error('Error parsing iCal feed:', error);
    throw error;
  }
}
