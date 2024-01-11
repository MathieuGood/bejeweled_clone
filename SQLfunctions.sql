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