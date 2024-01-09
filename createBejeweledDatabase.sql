SET AUTOCOMMIT = 0;
START TRANSACTION;


DROP DATABASE
    IF EXISTS bejeweledClone;

CREATE DATABASE bejeweledClone
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE bejeweledClone;


CREATE TABLE players (
    player_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    player_email VARCHAR(255) NOT NULL,
    player_password VARCHAR(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO players (
    player_name,
    player_email,
    player_password
    ) VALUES
    ('Mathieu', 'bon.mathieu@gmail.com', 'mb'),
    ('Test', 'test@test.com', 'test');



CREATE TABLE games (
        game_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        player_id INT NOT NULL,
        score INT NOT NULL,
        duration INT NOT NULL,
        end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO games (
    score,
    player_id,
    duration,
    end_time
    ) VALUES
    (234, 1, 276, '2024-01-08'),
    (134, 2, 231, '2024-01-08'),
    (302, 1, 456, '2024-01-08');



COMMIT;
SET AUTOCOMMIT = 1;