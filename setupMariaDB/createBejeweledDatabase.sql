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
    ('Mathieu', 'bon.mathieu@gmail.com', 'mathieubon', 1),
    ('Osiris', 'osiris@egyptian-god.com', 'osiris', 2),
    ('Anubis', 'anubis@egyptian-god.com', 'anubis', 3),
    ('Horus', 'horus@egyptian-god.com', 'horusrocks', 4),
    ('Bastet', 'bastet@egyptian-god.com', 'meowmeow', 5),
    ('Cleopatra', 'cleopatra@pharaoh.com', 'queenofegypt', 6),
    ('Ramses II', 'ramsestwo@pharaoh.com', 'ramsestwo', 7),
    ('Tutankhamun', 'tutankhamun@pharaoh.com', 'kingtut', 8),
    ('Norah', 'norah.essaih@uha.fr', 'Norah67', 0)
    ;



CREATE TABLE games (
        game_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        player_id INT UNSIGNED NOT NULL,
        score INT NOT NULL,
        duration INT NOT NULL,
        end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (player_id) REFERENCES players(player_id),
        INDEX(player_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO games (
    score,
    player_id,
    duration,
    end_time
    ) VALUES
    (500, 1, 276, '2024-01-08 14:01:00'),
    (1050, 2, 230, '2024-01-08 14:08:00'),
    (800, 3, 231, '2024-01-08 15:00:00'),
    (300, 4, 456, '2024-01-08 17:00:00'),
    (750, 5, 400, '2024-01-08 17:05:30'),
    (900, 6, 340, '2024-01-08 17:12:00'),
    (1450, 7, 300, '2024-01-08 17:15:00'),
    (150, 8, 124, '2024-01-09 06:00:00')
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