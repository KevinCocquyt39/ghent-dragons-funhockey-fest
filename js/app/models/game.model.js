var Game = function(id, gameType, gameTime, team1Id, team1Name, team1Score, team2Id, team2Name, team2Score, team3Id, team3Name, team3Score, team4Id, team4Name, team4Score) {
    var self = this;

    self.id = ko.observable(id);
    self.gameType = ko.observable(gameType);
    self.gameTime = ko.observable(gameTime);
    
    self.nextGameTime = ko.observable();
    self.nextTeam1 = ko.observable();
    self.nextTeam2 = ko.observable();
    self.nextTeam3 = ko.observable();
    self.nextTeam4 = ko.observable();

    self.team1Id = ko.observable(team1Id);
    self.team1Name = ko.observable(team1Name);
    self.team1Score = ko.observable(team1Score);
    self.team1Object = new Team();
    self.team1Status = ko.observable();

    self.team2Id = ko.observable(team2Id);
    self.team2Name = ko.observable(team2Name);
    self.team2Score = ko.observable(team2Score);
    self.team2Object = new Team();
    self.team2Status = ko.observable();
    
    self.team3Id = ko.observable(team3Id);
    self.team3Name = ko.observable(team3Name);
    self.team3Score = ko.observable(team3Score);
    self.team3Object = new Team();
    self.team3Status = ko.observable();

    self.team4Id = ko.observable(team4Id);
    self.team4Name = ko.observable(team4Name);
    self.team4Score = ko.observable(team4Score);
    self.team4Object = new Team();
    self.team4Status = ko.observable();

    self.durationTimeMinute = ko.observable('12');
    self.durationTimeSecond = ko.observable('00');
    self.startTime = ko.observable();
    self.currentTime = ko.observable();
    self.diffTime = ko.observable();
    self.diffTimeSeconds = ko.observable();
    self.diffTimeFull = ko.observable('00:00');
    self.isStopped = ko.observable(true);
    self.gameTimerId = ko.observable();

    // for semi finals...
    if (self.id() === 9 || self.id() === 10) {
        self.durationTimeMinute('15');
    }

    // for bronze / gold finals...
    if (self.id() === 11 || self.id() === 12) {
        self.durationTimeMinute('18');
    }

    self.startTimer = function () {
        self.startTime(new Date());
        self.isStopped(false);
        startGameTimer(self);

        $('').trigger('click');
    }

    self.stopTimer = function () {
        self.isStopped(true);
        stopGameTimer(self);
    }
}