export const messages = [
  {
    id: 4,
    userId: 2,
    date: "2024-03-03T20:12:00",
    content: "oui, c'est plus intime",
    forum: "ferme",
  },
  {
    id: 3,
    userId: 1,
    date: "2024-03-02T12:00:00",
    content: "c'est cool d'avoir un forum fermé :)",
    forum: "ferme",
  },
  {
    id: 2,
    userId: 2,
    date: "2024-03-03T20:12:00",
    content: "trop cool, je peux poster des messages",
    forum: "ouvert",
  },
  {
    id: 1,
    userId: 1,
    date: "2024-03-02T12:00:00",
    content: "hey, on est sur le forum ouvert !!",
    forum: "ouvert",
  },
];

export const users = [
  {
    id: 1,
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    isAdmin: false,
    createdAt: "2024-03-02T12:00:00",
    isVerified: true,
  },
  {
    id: 2,
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    isAdmin: true,
    createdAt: "2024-03-03T20:12:00",
    isVerified: true,
  },
  {
    id: 3,
    username: "loggeduser",
    firstName: "Logged",
    lastName: "User",
    isAdmin: true,
    createdAt: "2024-03-03T20:12:00",
    isVerified: true,
  },
  {
    id: 4,
    username: "unverifieduser",
    firstName: "Unverified",
    lastName: "User",
    isAdmin: false,
    createdAt: "2024-03-03T20:12:00",
    isVerified: false,
  },
];
