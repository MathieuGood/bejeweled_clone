SET AUTOCOMMIT = 0;
START TRANSACTION;


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
    ('Mathieu', 'bon.mathieu@gmail.com', 'e46354a123cbac37b62dff88f151a794067dfd23445fe985d15ca5dcc176dccfc640e53f78ac0fd12c3eac7756f9e363d625340f3a7577a22f8cd2097acea1c3', 1),
    ('Osiris', 'osiris@egyptian-god.com', '2a69c9fea18ff71313f1ab14308650531869e66cbc13072b710987fce58fa657f0d00b3036fea27c45ad226627cc71b46d37c6625f1effb374530981474f5380', 2),
    ('Anubis', 'anubis@egyptian-god.com', '88d0c024520e94b4d3e83941495e8617e1268695e385beceaa9a703823d967178b822e9472e0e84b6ee46e7dadbcb282bce4414fb3aacb088741943f2c9b53e3', 3),
    ('Bastet', 'bastet@egyptian-god.com', 'de4c2ff99fb34242646a324885db79ca9ef82a5f4b36c657b83ecf6931c008de87b6daf99a1c46336f36687d0ab1fc9b91f5bc07e7c3913bec3844993fd2fbad', 5),
    ('Cleopatra', 'cleopatra@pharaoh.com', '94d9c79958a928808f4b1afdb6bf51f6a5d4a0b2bb6f07f40e47b2f0a158667520f19ba2242edceec140ffe8f2ea0993025d3436c0655fb4d25c8ae5290ebe08', 6),
    ('Ramses II', 'ramsestwo@pharaoh.com', 'e2d07c0ac978e5fb3c92050e3dd46fa7494ca66425f1e413c6dd3663ef448d624606d6ec2ba5a9f786cde78d3b4af113d032c2a48ef388970c7d0a811900b865', 7),
    ('Tutankhamun', 'tutankhamun@pharaoh.com', '826714ca3371f84c489ebb76e5a2929303be1acc15a1e5a0ef0f73191f869c9c37b735ccbd817bedbab3910bcc7daf523f7682053fb87a65963cb89fba19f252
', 8),
    ('Norah', 'norah.essaih@uha.fr', 'd00c904644a7600b286cac762442ebd9838263665eef4ff48c47839ea3e88c998aea961628f1042da0bcb9e3571b85bfd4fb02ef146b6bc6cb4508f28ab19254', 0),
    ('Miaou', 'oplatralala@gmail.com', '938f81e4ad808235762b6692a3b65a336cb71b4bc26a5f3308acf24f8ce26bdc04626c72857605003eb6d3153431cfdec9271077ce40b88f2349f0bf8a993113', 0)
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
    (900, 1, 276, '2024-01-08 14:01:00'),
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
    SELECT player_id, player_name, player_email, prev_rank, MIN(rank) AS rank
    FROM (
        SELECT DISTINCT p.player_id, p.player_name, p.player_email, p.prev_rank, top_scores.rank
        FROM players AS p
        LEFT JOIN (
            SELECT RANK() OVER (ORDER BY score DESC) AS rank, player_id
            FROM games
            ORDER BY score DESC
            LIMIT 6
        ) AS top_scores ON p.player_id = top_scores.player_id
        WHERE p.prev_rank IS NOT NULL
    ) AS ranked_players
    GROUP BY player_id, player_name, player_email, prev_rank
    ORDER BY prev_rank ASC;
END //

DELIMITER ;



-- When the database is ready, update previous ranking based on current records

CALL updatePrevRanking();



COMMIT;
SET AUTOCOMMIT = 1;