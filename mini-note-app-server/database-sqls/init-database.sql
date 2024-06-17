CREATE DATABASE mini_note;

CREATE TABLE note(
    id int AUTO_INCREMENT PRIMARY KEY, 
    title varchar(100) NOT NULL, 
    status TINYINT(1) DEFAULT 0,
    updatedAt DATETIME DEFAULT NOW() NULL,
    createdAt DATETIME DEFAULT NOW()
);

-- INSERT INTO note(title)values("Buy Pechay Seeds");
