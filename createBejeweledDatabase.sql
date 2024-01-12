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
    player_password VARCHAR(255) NOT NULL,
    last_game_id INT DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO players (
    player_name,
    player_email,
    player_password,
    last_game_id
    ) VALUES
    ('Mathieu', 'bon.mathieu@gmail.com', 'mb', 2),
    ('Test', 'mathieu.bon@uha.com', 'test', 3),
    ('Toto', 'toto@toto.com', 'toto', NULL),
    ('John', 'john@john.com', 'john', NULL);



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
    (234, 1, 276, '2024-01-08 14:01:00'),
    (204, 1, 230, '2024-01-08 14:08:00'),
    (134, 2, 231, '2024-01-08 15:00:00'),
    (302, 1, 456, '2024-01-08 17:00:00'),
    (300, 1, 400, '2024-01-08 17:05:30'),
    (287, 1, 340, '2024-01-08 17:12:00'),
    (255, 1, 300, '2024-01-08 17:15:00'),
    (156, 2, 124, '2024-01-09 06:00:00')
    ;



-- Procedure to get all the games superior to last_game_id based on inputted player_email

DELIMITER //

CREATE PROCEDURE getLastGames(IN id VARCHAR(255))
BEGIN
    SELECT game_id, games.player_id, player_name, player_email, score, duration, end_time, last_game_id
    FROM `games`
    INNER JOIN players ON players.player_id = games.player_id
    WHERE players.player_id = id
      AND game_id > (
        SELECT last_game_id 
        FROM players 
        WHERE player_id = id
      );
END //

DELIMITER ;




COMMIT;
SET AUTOCOMMIT = 1;