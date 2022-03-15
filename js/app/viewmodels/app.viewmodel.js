var AppViewModel = function(){
    var self = this;

    self.durationTimeMinute = ko.observable('5');
    self.durationTimeSecond = ko.observable('00');
    self.startTime = ko.observable();
    self.currentTime = ko.observable();
    self.diffTime = ko.observable();
    self.diffTimeSeconds = ko.observable();
    self.diffTimeFull = ko.observable('00:00');
    self.isStopped = ko.observable(true);
    self.timerId = ko.observable();

    self.teams = ko.observableArray();
    self.teamsPondA = ko.observableArray();
    self.teamsPondB = ko.observableArray();
    self.teamsFinal = ko.observableArray();

    self.regularGames = ko.observableArray();
    self.semiFinalGames = ko.observableArray();
    self.consolidationGames = ko.observableArray();
    self.bronzeFinalGames = ko.observableArray();
    self.goldFinalGames = ko.observableArray();

    self.isVisibleSemiFinals = ko.observable(false);
    self.isVisibleFinals = ko.observable(false);

    self.winner = ko.observable();

    self.submitStatus = ko.observable("light-blue accent-2");

    // get teams
    self.teams = new TeamService().getTeams();

    // initialize when empty
    if (self.teams().length === 0) {
        initTeams(self);
        saveTeams(self);
    }

    // get games
    self.games = new GameService().getAllGames();

    // initialize when empty
    if (self.games().length === 0) {
        initGames(self, true);
        saveGames(self);
    }
    else {
        initGames(self, false);
    }

    self.setTeams = function() {
        console.log('set teams');

        self.submitStatus("green accent-2");
        saveTeams(self);

        self.teams = new TeamService().getTeams();

        initGames(self, true);
        saveGames(self);

        self.games = new GameService().getAllGames();
    }

    self.setSemiFinals = function() {
        var gameService = new GameService();
        gameService.deleteGame(7);
        gameService.deleteGame(8);
        gameService.deleteGame(9);
        gameService.deleteGame(10);
        gameService.deleteGame(11);

        self.semiFinalGames.removeAll();
        self.consolidationGames.removeAll();
        self.bronzeFinalGames.removeAll();
        self.goldFinalGames.removeAll();

        initSemiFinalGame1(self);
        initSemiFinalGame2(self);

        self.isVisibleSemiFinals(true);
        self.isVisibleFinals(false);

        $(".modal-trigger").leanModal();
    }

    self.setFinals = function() {
        var gameService = new GameService();
        gameService.deleteGame(9);
        gameService.deleteGame(10);
        gameService.deleteGame(11);

        self.consolidationGames.removeAll();
        self.bronzeFinalGames.removeAll();
        self.goldFinalGames.removeAll();

        initConsolidationGames(self);
        initFinalGames(self);

        self.isVisibleFinals(true);

        $(".modal-trigger").leanModal();
    }

    self.updateScoreRegular = function () {
        var teamService = new TeamService();
        var gameService = new GameService();

        // reset points + differentials
        for (var tiA = 0; tiA < self.teamsPondA().length; tiA++) {
            var teamA = self.teamsPondA()[tiA];

            teamA.points(0);
            teamA.differential(0);
            teamA.wins(0);
            teamA.draws(0);
            teamA.losses(0);
        }

        for (var tiB = 0; tiB < self.teamsPondB().length; tiB++) {
            var teamB = self.teamsPondB()[tiB];

            teamB.points(0);
            teamB.differential(0);
            teamB.wins(0);
            teamB.draws(0);
            teamB.losses(0);
        }

        // update points + statuses
        for (var gi = 0; gi < self.regularGames().length; gi++) {
            var game = self.regularGames()[gi];

            savePoints(game);
            saveStatuses(game);

            gameService.updateGame(game.id(), 'regular', game.gameTime(), game.team1Id(), game.team1Name(), game.team1Score(), game.team2Id(), game.team2Name(), game.team2Score(), game.team3Id(), game.team3Name(), game.team3Score(), game.team4Id(), game.team4Name(), game.team4Score());
            teamService.updateTeam(game.team1Object.id(), game.team1Object.name(), game.team1Object.points(), game.team1Object.differential());
            teamService.updateTeam(game.team2Object.id(), game.team2Object.name(), game.team2Object.points(), game.team2Object.differential());
            teamService.updateTeam(game.team3Object.id(), game.team3Object.name(), game.team3Object.points(), game.team3Object.differential());
            teamService.updateTeam(game.team4Object.id(), game.team4Object.name(), game.team4Object.points(), game.team4Object.differential());
        }

        // < = ascending / > = descending
        self.teamsPondA.sort(function (left, right) { return left.sortValue() === right.sortValue() ? 0 : (left.sortValue() > right.sortValue() ? -1 : 1) });
        self.teamsPondB.sort(function (left, right) { return left.sortValue() === right.sortValue() ? 0 : (left.sortValue() > right.sortValue() ? -1 : 1) });
    }

    self.updateScoreSemiFinals = function() {
        for (var gi = 0; gi < self.semiFinalGames().length; gi++) {
            var game = self.semiFinalGames()[gi];

            saveStatuses(game);

            var gameService = new GameService();
            gameService.updateGame(game.id(), 'playoffs', game.gameTime(), game.team1Id(), game.team1Name(), game.team1Score(), game.team2Id(), game.team2Name(), game.team2Score(), game.team3Id(), game.team3Name(), game.team3Score(), game.team4Id(), game.team4Name(), game.team4Score());
        }
    }

    self.updateScoreConsolidationGames = function() {
        for (var gi = 0; gi < self.consolidationGames().length; gi++) {
            var game = self.consolidationGames()[gi];

            saveStatuses(game);

            var gameService = new GameService();
            gameService.updateGame(game.id(), 'playoffs', game.gameTime(), game.team1Id(), game.team1Name(), game.team1Score(), game.team2Id(), game.team2Name(), game.team2Score(), game.team3Id(), game.team3Name(), game.team3Score(), game.team4Id(), game.team4Name(), game.team4Score());
        }
    }

    self.updateScoreBronzeFinals = function () {
        for (var gi = 0; gi < self.bronzeFinalGames().length; gi++) {
            var game = self.bronzeFinalGames()[gi];

            saveStatuses(game);

            var gameService = new GameService();
            gameService.updateGame(game.id(), 'playoffs', game.gameTime(), game.team1Id(), game.team1Name(), game.team1Score(), game.team2Id(), game.team2Name(), game.team2Score(), game.team3Id(), game.team3Name(), game.team3Score(), game.team4Id(), game.team4Name(), game.team4Score());
        }
    }

    self.updateScoreGoldFinals = function () {
        var teamService = new TeamService();
        var gameService = new GameService();

        for (var gi = 0; gi < self.goldFinalGames().length; gi++) {
            var game = self.goldFinalGames()[gi];

            saveStatuses(game);

            var gameService = new GameService();
            gameService.updateGame(game.id(), 'playoffs', game.gameTime(), game.team1Id(), game.team1Name(), game.team1Score(), game.team2Id(), game.team2Name(), game.team2Score(), game.team3Id(), game.team3Name(), game.team3Score(), game.team4Id(), game.team4Name(), game.team4Score());
        }

        // set winner
        var goldGame = gameService.getGame(11);
        if (goldGame !== null) {
            if (goldGame.team1Score() > goldGame.team2Score()) {
                self.winner(teamService.getTeam(goldGame.team1Id()).name());
            } else {
                self.winner(teamService.getTeam(goldGame.team2Id()).name());
            }   
        }

        // set tournament overview
        var games = gameService.getAllGames();
        attachTeamObjects(games, self.teams);

        self.teams.sort(function (left, right) { return left.sortValue() === right.sortValue() ? 0 : (left.sortValue() > right.sortValue() ? -1 : 1) });
    }

    self.startTimer = function() {
        self.startTime(new Date());
        self.isStopped(false);
        startTimer(self);
    }

    self.stopTimer = function() {
        self.isStopped(true);
        stopTimer(self);
    }
}