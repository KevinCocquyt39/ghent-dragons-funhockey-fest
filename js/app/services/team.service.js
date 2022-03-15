var TeamService = function() {
    var self = this;

    self.getTeams = function () {
        var teams = ko.observableArray();

        for (var i in window.localStorage) {
            if (i.startsWith('team-')) {
                var data = localStorage.getItem(i);
                var team = JSON.parse(data);
                teams.push(new Team(team.id, team.name, team.points, team.differential));
            }
        }

        return teams;
    }

    self.getTeam = function (id) {
        var data = localStorage.getItem('team-' + id);
        var team = JSON.parse(data);

        if (team !== null && team.id === id) {
            return new Team(team.id, team.name, team.points, team.differential);
        }

        return null;
    }

    self.addTeam = function (id, name, points, differential) {
        var data = JSON.stringify({ id: id, name: name, points: points, differential: differential });
        localStorage.setItem('team-' + id, data);
    }

    self.updateTeam = function (id, name, points, differential) {
        var team = self.getTeam(id);
        if (team !== null) {
            var data = JSON.stringify({ id: id, name: name, points: points, differential: differential });
            localStorage.setItem('team-' + id, data);
        }
    }

    self.deleteTeam = function(id) {
        localStorage.removeItem('team-' + id);
    }
}