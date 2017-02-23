CREATE TABLE Users (
    "username" varchar(255) NOT NULL PRIMARY KEY,
    "password" varchar(255) NOT NULL
);

CREATE TABLE Favorites (
    "id" SERIAL PRIMARY KEY,
    "username" varchar(255),
    FOREIGN KEY(username) REFERENCES Users(username)
);
