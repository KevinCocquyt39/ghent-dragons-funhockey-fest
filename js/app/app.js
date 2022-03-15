(function(){
    var model = new AppViewModel();
    ko.applyBindings(model);

    $(".modal-trigger").leanModal();
})();