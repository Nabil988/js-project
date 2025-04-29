const events = [
  {
    title: "Meeting with Sarah",
    date: new Date('2025-02-12'),
    location: "Office",
    attendees: new Set(['John', 'Sarah']),
  },
  {
    title: "Team Lunch",
    date: new Date('2025-02-10'),
    location: "Cafe",
    attendees: new Set(['Alice', 'Bob']),
  },
  {
    title: "Conference",
    date: new Date('2025-02-16'),
    location: "Convention Center",
    attendees: new Set(['Dave', 'Emma']),
  },
];

const organizers = new WeakMap();

function setOrganizer(eventTitle, organizerName) {
  const event = events.find(event => event.title === eventTitle);
  if (event) {
    organizers.set(event, organizerName);
  }
}

setOrganizer("Meeting with Sarah", "John");
setOrganizer("Team Lunch", "Alice");
setOrganizer("Conference", "Charlie");

function getEventsInNext7Days() {
  const currentDate = new Date();
  const next7Days = new Date(currentDate);
  next7Days.setDate(currentDate.getDate() + 7);

  const upcomingEvents = events.filter(event => event.date >= currentDate && event.date <= next7Days);

  console.log("Upcoming Events in the Next 7 Days:");
  upcomingEvents.forEach(event => {
    const { title, date, location } = event;
    console.log(`Title: ${title}, Date: ${date.toLocaleDateString()}, Location: ${location}`);
  });
}

function addAttendee(eventTitle, attendeeName) {
  const event = events.find(event => event.title === eventTitle);
  if (event) {
    event.attendees.add(attendeeName);
    console.log(`${attendeeName} has been added to the event: ${eventTitle}`);
  } else {
    console.warn(`Event not found: ${eventTitle}`);
  }
}

function convertEventsToJSON() {
  const eventsJSON = events.map(event => {
    const { title, date, location, attendees } = event;
    return {
      title,
      location,
      attendees: Array.from(attendees),
      date: date.toISOString(),
      formattedDate: date.toLocaleDateString('en-US'),
    };
  });

  return JSON.stringify(eventsJSON, null, 2);
}

function displayEventProperties(eventIndex = 0) {
  const event = events[eventIndex];
  if (event) {
    console.log("Properties and values of the first event:");
    console.log("Object.keys():", Object.keys(event));
    console.log("Object.values():", Object.values(event));
    console.log("Object.entries():", Object.entries(event));
  }
}

// Call functions
getEventsInNext7Days();
addAttendee("Team Lunch", "Charlie");

console.log("Events in JSON format:");
console.log(convertEventsToJSON());

displayEventProperties();

console.log("All events:");
events.forEach(event => {
  const { title, date } = event;
  console.log(`Title: ${title}, Date: ${date.toLocaleDateString()}`);
});
