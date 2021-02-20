$(document).ready(function () {

    // VARIABLES

    function Clicker(id, color, count, upgradeLevels) {
        this.id = id;
        this.color = color;
        this.count = count;
        this.upgradeLevels = upgradeLevels;
        this.Upgrade = () => {clickerUpgrade(this)}
    }

    var clickerOne = new Clicker("One", "red", 0, [3, 6, 10]);
    var clickerTwo = new Clicker("Two", "green", 0, [3, 6, 10]);
    var clickerThree = new Clicker("Three", "green", 0, [3, 6, 10]);
    var clickerFour = new Clicker("Four", "green", 0, [3, 6, 10]);
    var clickerFive = new Clicker("Five", "green", 0, [3, 6, 10]);
    var clickerSix = new Clicker("Six", "green", 0, [3, 6, 10]);
    var clickerSeven = new Clicker("Seven", "green", 0, [3, 6, 10]);
    var clickerEight = new Clicker("Eight", "green", 0, [3, 6, 10]);

    let clickers = [clickerOne, clickerTwo, clickerThree, clickerFour, clickerFive, clickerSix, clickerSeven, clickerEight]

    // FUNCTIONS

    incrementCounter = (count, i, btn) => {
        count = count + i;
        $(btn).text(count.toString())
        return count;
    }

    upgradeCheck = (clicker) => {
        clicker.Upgrade()
    }

    clickerUpgrade = (clicker, btn) => {
        if (clicker.count > 22) {
            $(btn).text("upgrade!")
            console.log(btn + " upgrade!")
        }
    }

    // EVENTS
    
    $("button").click(function () {
        var clickedButton = $(this).attr("id");

        for (let i = 0; i < 8; i++) {
            if (clickers[i].id === clickedButton) {
                clickers[i].count = incrementCounter(clickers[i].count, 5, this);
                upgradeCheck(clickers[i])

            }
        }
    })

});