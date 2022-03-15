var Team = function(id, name, points, differential) {
    var self = this;

    self.id = ko.observable(id);
    self.name = ko.observable(name);
    self.points = ko.observable(points);
    self.differential = ko.observable(differential);
    self.sortValue = ko.computed(function () { return (self.points() * 100) + self.differential() });

    self.wins = ko.observable();
    self.draws = ko.observable();
    self.losses = ko.observable();
}