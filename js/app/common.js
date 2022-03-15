// teams

function initTeams(model) {
    model.teams.removeAll();
    model.teams.push(new Team(1, "Mighty Pucks", 0, 0));
    model.teams.push(new Team(2, "Ghent Rats", 0, 0));
    model.teams.push(new Team(3, "Team Reflexspray", 0, 0));
    model.teams.push(new Team(4, "Melle", 0, 0));
    model.teams.push(new Team(5, "Equipe International", 0, 0));
    model.teams.push(new Team(6, "Beer Buddies", 0, 0));
    model.teams.push(new Team(7, "Popay", 0, 0));
    model.teams.push(new Team(8, "Pink Pucks", 0, 0));
}

function saveTeams(model) {
    var generalService = new GeneralService();
    var teamService = new TeamService();

    generalService.clearStorage();

    for (var ti = 0; ti < model.teams().length; ti++) {
        var team = model.teams()[ti];
        teamService.addTeam(team.id(), team.name(), 0, 0);
    }
}

// games

function initGames(model, isNew) {
    model.regularGames.removeAll();
    model.semiFinalGames.removeAll();
    model.consolidationGames.removeAll();
    model.bronzeFinalGames.removeAll();
    model.goldFinalGames.removeAll();

    model.isVisibleSemiFinals(false);
    model.isVisibleFinals(false);

    if (isNew) {
        model.regularGames.push(
            new Game(
                1,
                "regular",
                "17:29",
                model.teams()[0].id(),
                model.teams()[0].name(),
                0,
                model.teams()[1].id(),
                model.teams()[1].name(),
                0,
                model.teams()[2].id(),
                model.teams()[2].name(),
                0,
                model.teams()[3].id(),
                model.teams()[3].name(),
                0
            )
        );
        model.regularGames.push(
            new Game(
                2,
                "regular",
                "17:44",
                model.teams()[4].id(),
                model.teams()[4].name(),
                0,
                model.teams()[5].id(),
                model.teams()[5].name(),
                0,
                model.teams()[6].id(),
                model.teams()[6].name(),
                0,
                model.teams()[7].id(),
                model.teams()[7].name(),
                0
            )
        );
        model.regularGames.push(
            new Game(
                3,
                "regular",
                "17:59",
                model.teams()[0].id(),
                model.teams()[0].name(),
                0,
                model.teams()[4].id(),
                model.teams()[4].name(),
                0,
                model.teams()[2].id(),
                model.teams()[2].name(),
                0,
                model.teams()[6].id(),
                model.teams()[6].name(),
                0
            )
        );
        model.regularGames.push(
            new Game(
                4,
                "regular",
                "18:14",
                model.teams()[1].id(),
                model.teams()[1].name(),
                0,
                model.teams()[5].id(),
                model.teams()[5].name(),
                0,
                model.teams()[3].id(),
                model.teams()[3].name(),
                0,
                model.teams()[7].id(),
                model.teams()[7].name(),
                0
            )
        );
        model.regularGames.push(
            new Game(
                5,
                "regular",
                "18:29",
                model.teams()[0].id(),
                model.teams()[0].name(),
                0,
                model.teams()[5].id(),
                model.teams()[5].name(),
                0,
                model.teams()[2].id(),
                model.teams()[2].name(),
                0,
                model.teams()[7].id(),
                model.teams()[7].name(),
                0
            )
        );
        model.regularGames.push(
            new Game(
                6,
                "regular",
                "18:44",
                model.teams()[1].id(),
                model.teams()[1].name(),
                0,
                model.teams()[4].id(),
                model.teams()[4].name(),
                0,
                model.teams()[3].id(),
                model.teams()[3].name(),
                0,
                model.teams()[6].id(),
                model.teams()[6].name(),
                0
            )
        );
    } else {
        var gameService = new GameService();

        model.regularGames.push(gameService.getGame(1));
        model.regularGames.push(gameService.getGame(2));
        model.regularGames.push(gameService.getGame(3));
        model.regularGames.push(gameService.getGame(4));
        model.regularGames.push(gameService.getGame(5));
        model.regularGames.push(gameService.getGame(6));
    }

    model.teamsPondA.removeAll();
    model.teamsPondA.push(model.teams()[0]);
    model.teamsPondA.push(model.teams()[1]);
    model.teamsPondA.push(model.teams()[4]);
    model.teamsPondA.push(model.teams()[5]);

    model.teamsPondB.removeAll();
    model.teamsPondB.push(model.teams()[2]);
    model.teamsPondB.push(model.teams()[3]);
    model.teamsPondB.push(model.teams()[6]);
    model.teamsPondB.push(model.teams()[7]);

    // < = ascending / > = descending
    model.teamsPondA.sort(function(left, right) {
        return left.sortValue() === right.sortValue() ? 0 : left.sortValue() > right.sortValue() ? -1 : 1;
    });
    model.teamsPondB.sort(function(left, right) {
        return left.sortValue() === right.sortValue() ? 0 : left.sortValue() > right.sortValue() ? -1 : 1;
    });

    attachTeamObjects(model.regularGames, model.teams);
}

function saveGames(model) {
    var gameService = new GameService();

    for (var gi = 0; gi < model.regularGames().length; gi++) {
        var game = model.regularGames()[gi];
        gameService.addGame(
            game.id(),
            game.gameType(),
            game.gameTime(),
            game.team1Id(),
            game.team1Name(),
            game.team1Score(),
            game.team2Id(),
            game.team2Name(),
            game.team2Score(),
            game.team3Id(),
            game.team3Name(),
            game.team3Score(),
            game.team4Id(),
            game.team4Name(),
            game.team4Score()
        );
    }
}

function attachTeamObjects(games, teams) {
    for (var ti = 0; ti < teams().length; ti++) {
        var team = teams()[ti];

        team.points(0);
        team.differential(0);
        team.wins(0);
        team.draws(0);
        team.losses(0);
    }

    for (var gi = 0; gi < games().length; gi++) {
        var game = games()[gi];

        //// set proper reference to team 1
        var team1Match = $.grep(teams(), function(t) {
            return t.id() === game.team1Id();
        });

        if (team1Match && team1Match.length === 1) {
            game.team1Object = team1Match[0];
        }

        //// set proper reference to team 2
        var team2Match = $.grep(teams(), function(t) {
            return t.id() === game.team2Id();
        });

        if (team2Match && team2Match.length === 1) {
            game.team2Object = team2Match[0];
        }

        //// set proper reference to team 3
        var team3Match = $.grep(teams(), function(t) {
            return t.id() === game.team3Id();
        });

        if (team3Match && team3Match.length === 1) {
            game.team3Object = team3Match[0];
        }

        //// set proper reference to team 4
        var team4Match = $.grep(teams(), function(t) {
            return t.id() === game.team4Id();
        });

        if (team4Match && team4Match.length === 1) {
            game.team4Object = team4Match[0];
        }

        savePoints(game);
        saveStatuses(game);
    }

    // set next
    for (var giN = 0; giN < games().length; giN++) {
        var gameN = games()[giN];

        if (games().length > giN + 1) {
            var nextGame = games()[giN + 1];
            gameN.nextGameTime(nextGame.gameTime());
            gameN.nextTeam1(nextGame.team1Object.name());
            gameN.nextTeam2(nextGame.team2Object.name());
            gameN.nextTeam3(nextGame.team3Object.name());
            gameN.nextTeam4(nextGame.team4Object.name());
        } else {
            gameN.nextGameTime("PLAY-OFFS");
            gameN.nextTeam1("...");
            gameN.nextTeam2("...");
            gameN.nextTeam3("...");
            gameN.nextTeam4("...");
        }
    }
}

// timer

function startTimer(model) {
    var timer = setTimeout(function() {
        model.currentTime(new Date());
        model.diffTime(model.currentTime() - model.startTime());
        model.diffTimeSeconds(Math.floor(model.diffTime() / 1000));

        var seconds = parseInt(model.durationTimeMinute()) * 60 + parseInt(model.durationTimeSecond());
        model.diffTimeFull((seconds - model.diffTimeSeconds()).toMMSS());

        startTimer(model);
    }, 1000);

    model.timerId(timer);
}

function stopTimer(model) {
    clearTimeout(model.timerId);

    var timeParts = model.diffTimeFull().split(":");
    model.durationTimeMinute(timeParts[0]);
    model.durationTimeSecond(timeParts[1]);
}

// game timer

function startGameTimer(game) {
    var id = setTimeout(function() {
        if (!game.isStopped()) {
            game.currentTime(new Date());
            game.diffTime(game.currentTime() - game.startTime());
            game.diffTimeSeconds(Math.floor(game.diffTime() / 1000));

            var seconds = parseInt(game.durationTimeMinute()) * 60 + parseInt(game.durationTimeSecond());
            game.diffTimeFull((seconds - game.diffTimeSeconds()).toMMSS());

            startGameTimer(game);
        }
    }, 1000);

    game.gameTimerId(id);
}

function stopGameTimer(game) {
    clearTimeout(game.gameTimerId);

    var timeParts = game.diffTimeFull().split(":");
    game.durationTimeMinute(timeParts[0]);
    game.durationTimeSecond(timeParts[1]);
}

// game points

function savePoints(game) {
    var pointsForLoss = 0;
    var pointsForDraw = 1;
    var pointsForWin = 3;

    if (game.id() === 7) {
        pointsForLoss = 3;
        pointsForDraw = 4;
        pointsForWin = 5;
    }

    if (game.id() === 8) {
        pointsForLoss = 6;
        pointsForDraw = 7;
        pointsForWin = 8;
    }

    if (game.id() === 9) {
        pointsForLoss = 9;
        pointsForDraw = 10;
        pointsForWin = 11;
    }

    if (game.id() === 10) {
        pointsForLoss = 12;
        pointsForDraw = 13;
        pointsForWin = 14;
    }

    if (game.id() === 11) {
        pointsForLoss = 15;
        pointsForDraw = 16;
        pointsForWin = 17;
    }

    console.log(
        "game, pointsforloss, draw, win",
        game.id() + ", " + pointsForLoss + ", " + pointsForDraw + ", " + pointsForWin
    );

    if (game.team1Object !== null && game.team2Object !== null) {
        if (parseInt(game.team1Score()) > parseInt(game.team2Score())) {
            game.team1Object.wins(game.team1Object.wins() + 1);
            game.team1Object.points(game.team1Object.points() + pointsForWin);
            game.team2Object.losses(game.team2Object.losses() + 1);
            game.team2Object.points(game.team2Object.points() + pointsForLoss);
        } else if (parseInt(game.team1Score()) === parseInt(game.team2Score())) {
            game.team1Object.draws(game.team1Object.draws() + 1);
            game.team1Object.points(game.team1Object.points() + pointsForDraw);
            game.team2Object.draws(game.team2Object.draws() + 1);
            game.team2Object.points(game.team2Object.points() + pointsForDraw);
        } else if (parseInt(game.team1Score()) < parseInt(game.team2Score())) {
            game.team1Object.losses(game.team1Object.losses() + 1);
            game.team1Object.points(game.team1Object.points() + pointsForLoss);
            game.team2Object.wins(game.team2Object.wins() + 1);
            game.team2Object.points(game.team2Object.points() + pointsForWin);
        }

        game.team1Object.differential(game.team1Object.differential() + (game.team1Score() - game.team2Score()));
        game.team2Object.differential(game.team2Object.differential() + (game.team2Score() - game.team1Score()));
    }

    if (game.team3Object !== null && game.team4Object !== null) {
        if (parseInt(game.team3Score()) > parseInt(game.team4Score())) {
            game.team3Object.wins(game.team3Object.wins() + 1);
            game.team3Object.points(game.team3Object.points() + pointsForWin);
            game.team4Object.losses(game.team4Object.losses() + 1);
            game.team4Object.points(game.team4Object.points() + pointsForLoss);
        } else if (parseInt(game.team3Score()) === parseInt(game.team4Score())) {
            game.team3Object.draws(game.team3Object.draws() + 1);
            game.team3Object.points(game.team3Object.points() + pointsForDraw);
            game.team4Object.draws(game.team4Object.draws() + 1);
            game.team4Object.points(game.team4Object.points() + pointsForDraw);
        } else if (parseInt(game.team3Score()) < parseInt(game.team4Score())) {
            game.team3Object.losses(game.team3Object.losses() + 1);
            game.team3Object.points(game.team3Object.points() + pointsForLoss);
            game.team4Object.wins(game.team4Object.wins() + 1);
            game.team4Object.points(game.team4Object.points() + pointsForWin);
        }

        game.team3Object.differential(game.team3Object.differential() + (game.team3Score() - game.team4Score()));
        game.team4Object.differential(game.team4Object.differential() + (game.team4Score() - game.team3Score()));
    }
}

// game status

function saveStatuses(game) {
    game.team1Status("");
    game.team2Status("");
    game.team3Status("");
    game.team4Status("");

    if (parseInt(game.team1Score()) > parseInt(game.team2Score())) {
        game.team1Status("green-text");
        game.team2Status("red-text");
    } else if (parseInt(game.team1Score()) < parseInt(game.team2Score())) {
        game.team1Status("red-text");
        game.team2Status("green-text");
    } else if (
        parseInt(game.team1Score()) > 0 &&
        parseInt(game.team2Score()) > 0 &&
        parseInt(game.team1Score()) === parseInt(game.team2Score())
    ) {
        game.team1Status("blue-text");
        game.team2Status("blue-text");
    }

    if (parseInt(game.team3Score()) > parseInt(game.team4Score())) {
        game.team3Status("green-text");
        game.team4Status("red-text");
    } else if (parseInt(game.team3Score()) < parseInt(game.team4Score())) {
        game.team3Status("red-text");
        game.team4Status("green-text");
    } else if (
        parseInt(game.team3Score()) > 0 &&
        parseInt(game.team4Score()) > 0 &&
        parseInt(game.team3Score()) === parseInt(game.team4Score())
    ) {
        game.team3Status("blue-text");
        game.team4Status("blue-text");
    }
}

// play-off games

function initSemiFinalGame1(model) {
    var teamService = new TeamService();
    var gameService = new GameService();

    var team1 = model.teamsPondA()[2];
    var team2 = model.teamsPondB()[3];
    var team3 = model.teamsPondA()[3];
    var team4 = model.teamsPondB()[2];

    var game = new Game(
        7,
        "playoffs",
        "19:21",
        team1.id(),
        team1.name(),
        0,
        team2.id(),
        team2.name(),
        0,
        team3.id(),
        team3.name(),
        0,
        team4.id(),
        team4.name(),
        0
    );
    game.team1Object = teamService.getTeam(team1.id());
    game.team2Object = teamService.getTeam(team2.id());
    game.team3Object = teamService.getTeam(team3.id());
    game.team4Object = teamService.getTeam(team4.id());

    model.semiFinalGames.push(game);

    gameService.addGame(
        game.id(),
        "playoffs",
        game.gameTime(),
        game.team1Id(),
        game.team1Name(),
        game.team1Score(),
        game.team2Id(),
        game.team2Name(),
        game.team2Score(),
        game.team3Id(),
        game.team3Name(),
        game.team3Score(),
        game.team4Id(),
        game.team4Name(),
        game.team4Score()
    );
}

function initSemiFinalGame2(model) {
    var teamService = new TeamService();
    var gameService = new GameService();

    var team1 = model.teamsPondA()[0];
    var team2 = model.teamsPondB()[1];
    var team3 = model.teamsPondA()[1];
    var team4 = model.teamsPondB()[0];

    var game = new Game(
        8,
        "playoffs",
        "19:36",
        team1.id(),
        team1.name(),
        0,
        team2.id(),
        team2.name(),
        0,
        team3.id(),
        team3.name(),
        0,
        team4.id(),
        team4.name(),
        0
    );
    game.team1Object = teamService.getTeam(team1.id());
    game.team2Object = teamService.getTeam(team2.id());
    game.team3Object = teamService.getTeam(team3.id());
    game.team4Object = teamService.getTeam(team4.id());

    model.semiFinalGames.push(game);

    gameService.addGame(
        game.id(),
        "playoffs",
        game.gameTime(),
        game.team1Id(),
        game.team1Name(),
        game.team1Score(),
        game.team2Id(),
        game.team2Name(),
        game.team2Score(),
        game.team3Id(),
        game.team3Name(),
        game.team3Score(),
        game.team4Id(),
        game.team4Name(),
        game.team4Score()
    );
}

function initConsolidationGames(model) {
    var teamService = new TeamService();
    var gameService = new GameService();

    var semiFinalGame1 = gameService.getGame(7);

    var winnerC;
    var winnerD;
    var loserC;
    var loserD;

    if (semiFinalGame1.team1Score() > semiFinalGame1.team2Score()) {
        winnerC = teamService.getTeam(semiFinalGame1.team1Id());
    } else {
        winnerC = teamService.getTeam(semiFinalGame1.team2Id());
    }

    if (semiFinalGame1.team3Score() > semiFinalGame1.team4Score()) {
        winnerD = teamService.getTeam(semiFinalGame1.team3Id());
    } else {
        winnerD = teamService.getTeam(semiFinalGame1.team4Id());
    }

    if (semiFinalGame1.team1Score() < semiFinalGame1.team2Score()) {
        loserC = teamService.getTeam(semiFinalGame1.team1Id());
    } else {
        loserC = teamService.getTeam(semiFinalGame1.team2Id());
    }

    if (semiFinalGame1.team3Score() < semiFinalGame1.team4Score()) {
        loserD = teamService.getTeam(semiFinalGame1.team3Id());
    } else {
        loserD = teamService.getTeam(semiFinalGame1.team4Id());
    }

    var game = new Game(
        9,
        "playoffs",
        "19:51",
        winnerC.id(),
        winnerC.name(),
        0,
        winnerD.id(),
        winnerD.name(),
        0,
        loserC.id(),
        loserC.name(),
        0,
        loserD.id(),
        loserD.name(),
        0
    );
    game.team1Object = teamService.getTeam(winnerC);
    game.team2Object = teamService.getTeam(winnerD);
    game.team3Object = teamService.getTeam(loserC);
    game.team4Object = teamService.getTeam(loserD);

    model.consolidationGames.push(game);

    gameService.addGame(
        game.id(),
        "playoffs",
        game.gameTime(),
        game.team1Id(),
        game.team1Name(),
        game.team1Score(),
        game.team2Id(),
        game.team2Name(),
        game.team2Score(),
        game.team3Id(),
        game.team3Name(),
        game.team3Score(),
        game.team4Id(),
        game.team4Name(),
        game.team4Score()
    );
}

function initFinalGames(model) {
    var teamService = new TeamService();
    var gameService = new GameService();

    var semiFinalGame2 = gameService.getGame(8);

    var winnerA;
    var winnerB;
    var loserA;
    var loserB;

    if (semiFinalGame2.team1Score() > semiFinalGame2.team2Score()) {
        winnerA = teamService.getTeam(semiFinalGame2.team1Id());
        loserA = teamService.getTeam(semiFinalGame2.team2Id());
    } else {
        winnerA = teamService.getTeam(semiFinalGame2.team2Id());
        loserA = teamService.getTeam(semiFinalGame2.team1Id());
    }

    if (semiFinalGame2.team3Score() > semiFinalGame2.team4Score()) {
        winnerB = teamService.getTeam(semiFinalGame2.team3Id());
        loserB = teamService.getTeam(semiFinalGame2.team4Id());
    } else {
        winnerB = teamService.getTeam(semiFinalGame2.team4Id());
        loserB = teamService.getTeam(semiFinalGame2.team3Id());
    }

    // bronze finals
    var bronzeGame = new Game(
        10,
        "playoffs",
        "20:31",
        loserA.id(),
        loserA.name(),
        0,
        loserB.id(),
        loserB.name(),
        0,
        null,
        null,
        null,
        null
    );
    bronzeGame.team1Object = teamService.getTeam(loserA);
    bronzeGame.team2Object = teamService.getTeam(loserB);

    model.bronzeFinalGames.push(bronzeGame);

    gameService.addGame(
        bronzeGame.id(),
        "playoffs",
        bronzeGame.gameTime(),
        bronzeGame.team1Id(),
        bronzeGame.team1Score(),
        bronzeGame.team1Name(),
        bronzeGame.team2Id(),
        bronzeGame.team2Name(),
        bronzeGame.team2Score(),
        bronzeGame.team3Id(),
        bronzeGame.team3Name(),
        bronzeGame.team3Score(),
        bronzeGame.team4Id(),
        bronzeGame.team4Name(),
        bronzeGame.team4Score()
    );

    // gold finals
    var goldGame = new Game(
        11,
        "playoffs",
        "20:52",
        winnerA.id(),
        winnerA.name(),
        0,
        winnerB.id(),
        winnerB.name(),
        0,
        null,
        null,
        null,
        null
    );
    goldGame.team1Object = teamService.getTeam(winnerA);
    goldGame.team2Object = teamService.getTeam(winnerB);

    model.goldFinalGames.push(goldGame);

    gameService.addGame(
        goldGame.id(),
        "playoffs",
        goldGame.gameTime(),
        goldGame.team1Id(),
        goldGame.team1Name(),
        goldGame.team1Score(),
        goldGame.team2Id(),
        goldGame.team2Name(),
        goldGame.team2Score(),
        goldGame.team3Id(),
        goldGame.team3Name(),
        goldGame.team3Score(),
        goldGame.team4Id(),
        goldGame.team4Name(),
        goldGame.team4Score()
    );
}
