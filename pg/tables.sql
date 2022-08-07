CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    password TEXT NOT NULL, 
    email TEXT NOT NULL UNIQUE, 
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    token TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES users(id),
    url TEXT NOT NULL,
    "visitantCount" INTEGER NOT NULL DEFAULT 0,
    "shortUrl" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP DEFAULT NOW()
);