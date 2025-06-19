const http = require("http");
const express = require("express");
const { error } = require("console");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

morgan.token("post-data", (request) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return "";
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);
app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello world!</h1>");
});

app.get("/info", (request, response) => {
  const currentTime = new Date().toString();
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentTime}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send("Something broke!");
});

app.use((request, response) => {
  response.status(404).send("<h1>404 Not Found</h1>");
});

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 99999);
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }
  if (persons.some((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }
  const person = {
    id: String(id),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  console.log(person);
  response.json(person);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
