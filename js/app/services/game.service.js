var GameService = function(){
    var self = this;

    self.getAllGames = function () {
        var games = ko.observableArray();

        for (var i in window.localStorage) {
            if (i.startsWith('game-')) {
                var data = localStorage.getItem(i);
                var game = JSON.parse(data);

                games.push(new Game(game.id, game.gameType, game.gameTime, game.team1Id, game.team1Name, game.team1Score, game.team2Id, game.team2Name, game.team2Score, game.team3Id, game.team3Name, game.team3Score, game.team4Id, game.team4Name, game.team4Score));
            }
        }

        return games;
    }

    self.getGames = function (gameType) {
        var games = ko.observableArray();

        for (var i in window.localStorage) {
            if (i.startsWith('game-')) {
                var data = localStorage.getItem(i);
                var game = JSON.parse(data);

                if (game.gameType === gameType) {
                    games.push(new Game(game.id, game.gameType, game.gameTime, game.team1Id, game.team1Name, game.team1Score, game.team2Id, game.team2Name, game.team2Score, game.team3Id, game.team3Name, game.team3Score, game.team4Id, game.team4Name, game.team4Score));
                }
            }
        }

        return games;
    }

    self.getGame = function (id) {
        var data = localStorage.getItem('game-' + id);
        var game = JSON.parse(data);

        if (game !== null && game.id === id) {
            return new Game(game.id, game.gameType, game.gameTime, game.team1Id, game.team1Name, game.team1Score, game.team2Id, game.team2Name, game.team2Score, game.team3Id, game.team3Name, game.team3Score, game.team4Id, game.team4Name, game.team4Score);
        }

        return null;
    }

    self.addGame = function (id, gameType, gameTime, team1Id, team1Name, team1Score, team2Id, team2Name, team2Score, team3Id, team3Name, team3Score, team4Id, team4Name, team4Score) {
        var data = JSON.stringify({ id: id, gameType: gameType, gameTime: gameTime, team1Id: team1Id, team1Name: team1Name, team1Score: team1Score, team2Id: team2Id, team2Name: team2Name, team2Score: team2Score, team3Id: team3Id, team3Name: team3Name, team3Score: team3Score, team4Id: team4Id, team4Name: team4Name, team4Score: team4Score });

        localStorage.setItem('game-' + id, data);
    }

    self.updateGame = function (id, gameType, gameTime, team1Id, team1Name, team1Score, team2Id, team2Name, team2Score, team3Id, team3Name, team3Score, team4Id, team4Name, team4Score) {
        var game = self.getGame(id);
        if (game !== null) {
            var data = JSON.stringify({ id: id, gameType: gameType, gameTime: gameTime, team1Id: team1Id, team1Name: team1Name, team1Score: team1Score, team2Id: team2Id, team2Name: team2Name, team2Score: team2Score, team3Id: team3Id, team3Name: team3Name, team3Score: team3Score, team4Id: team4Id, team4Name: team4Name, team4Score: team4Score });
            
            localStorage.setItem('game-' + id, data);
        }
    }

    self.deleteGame = function (id) {
        localStorage.removeItem('game-' + id);
    }
}