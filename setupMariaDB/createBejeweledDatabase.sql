SET AUTOCOMMIT = 0;
START TRANSACTION;


-- --------------------------------------------------------------------------------------
-- --------------------------------------------------------------------------------------
--
-- Database creation
--
-- --------------------------------------------------------------------------------------


DROP DATABASE
    IF EXISTS bejeweledClone;

CREATE DATABASE bejeweledClone
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE bejeweledClone;



-- --------------------------------------------------------------------------------------
--
-- Tables
--
-- --------------------------------------------------------------------------------------


CREATE TABLE players (
    player_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    player_email VARCHAR(255) NOT NULL,
    player_password VARCHAR(255) NOT NULL,
    last_game_id INT DEFAULT 0,
    prev_rank INT DEFAULT NULL,
    INDEX(player_email),
    CONSTRAINT UC_player_email UNIQUE (player_email)

) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO players (
    player_name,
    player_email,
    player_password,
    last_game_id
    ) VALUES
    ('Mathieu', 'bon.mathieu@gmail.com', 'mathieubon', 2),
    ('Testeur', 'mathieu.bon@uha.fr', 'test', 3),
    ('Guru', 'gurumatmat@gmail.com', 'guru', 0),
    ('John', 'john@john.com', 'john', 0),
    ('Alex', 'alex@alex.com', 'alex', 0),
    ('Terry', 'terry@terry.com', 'terry', 0),
    ('Graham', 'graham@graham.com', 'graham', 0),
    ('Eric', 'eric@eric.com', 'eric', 0)
    ;



CREATE TABLE games (
        game_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        player_id INT NOT NULL,
        score INT NOT NULL,
        duration INT NOT NULL,
        end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (player_id) REFERENCES players(player_id),
        INDEX(player_id),
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO games (
    score,
    player_id,
    duration,
    end_time
    ) VALUES
    (845, 1, 276, '2024-01-08 14:01:00'),
    (204, 1, 230, '2024-01-08 14:08:00'),
    (768, 2, 231, '2024-01-08 15:00:00'),
    (302, 1, 456, '2024-01-08 17:00:00'),
    (300, 1, 400, '2024-01-08 17:05:30'),
    (287, 1, 340, '2024-01-08 17:12:00'),
    (255, 1, 300, '2024-01-08 17:15:00'),
    (156, 2, 124, '2024-01-09 06:00:00'),
    (210, 3, 180, '2024-01-10 08:30:00'),
    (189, 4, 200, '2024-01-10 09:15:00'),
    (275, 5, 320, '2024-01-10 10:00:00'),
    (312, 6, 400, '2024-01-10 10:45:00'),
    (198, 7, 210, '2024-01-10 11:30:00'),
    (245, 8, 260, '2024-01-10 12:15:00'),
    (320, 8, 360, '2024-01-10 13:00:00'),
    (180, 1, 150, '2024-01-10 13:45:00'),
    (791, 3, 280, '2024-01-12 15:30:00'),
    (310, 4, 330, '2024-01-12 16:15:00'),
    (270, 5, 290, '2024-01-12 17:00:00'),
    (320, 6, 400, '2024-01-12 17:45:00'),
    (240, 7, 220, '2024-01-12 18:30:00'),
    (290, 8, 320, '2024-01-12 19:15:00'),
    (330, 8, 360, '2024-01-12 20:00:00'),
    (245, 1, 280, '2024-01-13 08:30:00'),
    (312, 2, 330, '2024-01-13 09:15:00'),
    (278, 3, 290, '2024-01-13 10:00:00'),
    (320, 4, 400, '2024-01-13 10:45:00'),
    (225, 5, 190, '2024-01-13 11:30:00'),
    (270, 6, 320, '2024-01-13 12:15:00'),
    (340, 7, 380, '2024-01-13 13:00:00'),
    (198, 8, 150, '2024-01-13 13:45:00'),
    (310, 3, 290, '2024-01-15 15:30:00'),
    (280, 4, 330, '2024-01-15 16:15:00'),
    (330, 5, 290, '2024-01-15 17:00:00'),
    (360, 6, 400, '2024-01-15 17:45:00'),
    (240, 7, 220, '2024-01-15 18:30:00'),
    (300, 8, 320, '2024-01-15 19:15:00'),
    (350, 8, 360, '2024-01-15 20:00:00')
    ;



-- --------------------------------------------------------------------------------------
--
-- Stored procedures and functions
--
-- -------------------------------------------------------------------------------------


DELIMITER //

-- Get all the games superior to last_game_id based on inputted player_email

-- Recently changes input paramter to INT, if not working anymore replace it with VARCHAR(255)
CREATE PROCEDURE getLastGames(IN id INT)
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



-- Get the top6 ranking of players based on score

CREATE PROCEDURE getRanking()
BEGIN
    SET @count := 0;

    SELECT (@count:=@count+1) AS rank, player_name, score
    FROM games
    INNER JOIN players ON games.player_id = players.player_id
    ORDER BY score DESC
    LIMIT 6;

END //



-- Get the rank of a specific player and return it as OUT parameter

CREATE PROCEDURE getPlayerRank(IN playerId INT, OUT playerRank INT)
BEGIN
    -- Create a temporary table to store the top scores
    DROP TEMPORARY TABLE IF EXISTS temp_top_scores;
    CREATE TEMPORARY TABLE temp_top_scores AS
        SELECT RANK() OVER (ORDER BY score DESC) AS rank, player_id
        FROM games
        ORDER BY score DESC
        LIMIT 6;

    -- Get the rank of the specified player from the temporary table
    SELECT rank INTO playerRank
    FROM temp_top_scores
    WHERE player_id = playerId
    ORDER BY rank ASC
    LIMIT 1;
END //



CREATE PROCEDURE updatePrevRanking()
BEGIN
    DECLARE count INT;
    DECLARE playerRank INT;

    SET count := 1;

    UPDATE players SET prev_rank = NULL;

    WHILE count <= (SELECT MAX(player_id) FROM players) DO
        CALL getPlayerRank(count, playerRank);

        UPDATE players SET prev_rank = playerRank WHERE player_id = count;

        SET count = count + 1;
    END WHILE;
END //



CREATE PROCEDURE getRankingDifference()
BEGIN
    SELECT player_id, player_name, prev_rank, MIN(rank) AS rank
    FROM (
        SELECT DISTINCT p.player_id, p.player_name, p.prev_rank, top_scores.rank
        FROM players AS p
        LEFT JOIN (
            SELECT RANK() OVER (ORDER BY score DESC) AS rank, player_id
            FROM games
            ORDER BY score DESC
            LIMIT 6
        ) AS top_scores ON p.player_id = top_scores.player_id
        WHERE p.prev_rank IS NOT NULL
    ) AS ranked_players
    GROUP BY player_id, player_name, prev_rank
    ORDER BY prev_rank ASC;
END //

DELIMITER ;



-- When the database is ready, update previous ranking based on current records

CALL updatePrevRanking();



COMMIT;
SET AUTOCOMMIT = 1;