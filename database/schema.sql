CREATE TABLE Users (
    "id" int PRIMARY KEY,
    "username" varchar(255) NOT NULL PRIMARY KEY,
);

CREATE TABLE Favorites (
    "id" SERIAL PRIMARY KEY,
    "userID" int,
    "username" varchar(255),
    FOREIGN KEY(userID) REFERENCES Users(username)
);
