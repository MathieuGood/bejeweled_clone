-- Send e-mail 1 hour after the last game with the list of games played



-- Query #1
-- Get last played games for one player (entries superior than last_game_id)

-- last_games
SELECT * FROM `games`
        WHERE player_id = 1 
          AND game_id > (SELECT last_game_id FROM players 
                            WHERE player_id = 1)


-- STORED PROCEDURE for Query #1
DELIMITER //

CREATE PROCEDURE bejeweledClone.getLastGames(IN input_player_id INT)
BEGIN


    SELECT *
    FROM `games`
    WHERE player_id = input_player_id
      AND game_id > (SELECT last_game_id FROM players WHERE player_id = input_player_id);


END //

DELIMITER ;





-- Query #2
-- Get very last game_id and end_time of one player
-- MAX(game_id) of Query #1
-- last_game
SELECT MAX(game_id), MAX(end_time)
    FROM (
        SELECT * FROM `games`
            WHERE player_id = 1 
            AND game_id > (SELECT last_game_id FROM players 
                                WHERE player_id = 1)
    ) AS last_game


-- Check if last_game has ended for at least an hour
-- If yes, send e-mail
-- TO : email
-- CONTENT : last_games
