-------------------------------------------
-- Draft for SQL functions
-------------------------------------------



-- Get last played games for one player (entries superior than last_game_id)

SELECT * FROM `games`
INNER JOIN players
ON players.player_id = games.player_id
WHERE player_email = 'bon.mathieu@gmail.com' 
  AND game_id > (
    SELECT last_game_id 
    FROM players 
    WHERE player_email = 'bon.mathieu@gmail.com' 
  );




DELIMITER //

CREATE PROCEDURE getLastGames(IN email VARCHAR(255))
BEGIN
    SELECT game_id, games.player_id, player_name, player_email, score, duration, end_time, last_game_id
    FROM `games`
    INNER JOIN players ON players.player_id = games.player_id
    WHERE player_email = email
      AND game_id > (
        SELECT last_game_id 
        FROM players 
        WHERE player_email = email
      );
END //

DELIMITER ;


-- TOP SCORES

SELECT games.player_id, player_name, score, prev_ranking FROM games INNER JOIN players ON games.player_id = players.player_id ORDER BY score DESC LIMIT 6;



DELIMITER //

CREATE OR REPLACE PROCEDURE getTopScores()
BEGIN
    SET @count := 0;

        DROP TEMPORARY TABLE IF EXISTS temp_top_scores;

    CREATE TEMPORARY TABLE temp_top_scores AS
    SELECT (@count:=@count+1) AS rank, games.player_id, player_name, score, prev_ranking
    FROM games
    INNER JOIN players ON games.player_id = players.player_id
    ORDER BY score DESC
    LIMIT 6;

    SELECT * FROM temp_top_scores;


END //

DELIMITER ;



-- UPDATE RANKING

UPDATE players SET prev_ranking = 1 WHERE player_id = 1







DELIMITER //

CREATE PROCEDURE updateRanking()
BEGIN


    SET @count := 1;

    UPDATE player SET prev_ranking = NULL;


    WHILE count < (SELECT player_id FROM players ORDER BY player_id DESC LIMIT 1) DO

        DECLARE @playerRank INT;
        CALL getPlayerRank(count, @playerRank);

        UPDATE players SET prev_ranking = @playerRank WHERE player_id = @count;

        SET count = count + 1;


    END WHILE;


END //

DELIMITER ;







-----


