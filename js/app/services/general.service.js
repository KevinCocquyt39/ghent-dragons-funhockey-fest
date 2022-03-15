var GeneralService = function(){
    var self = this;

    self.clearStorage = function() {
        for (var i in window.localStorage) {
            localStorage.removeItem(i);
        }
    }
}