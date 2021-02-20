$(document).ready(function () {

    function Clicker(id, color, count, upgradeLevels) {
        this.id = id;
        this.color = color;
        this.count = count;
        this.upgradeLevels = upgradeLevels;
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
    console.log(clickers);


    // initialise = (buttons, upgrades) => {
    //     for (let i = 0; i < buttons; i++) {
    //         counter[i] = 0;
    //         console.log(counter[i]);
    //         for (let j = 0; j < upgrades; j++) {
    //             upgradeUnlocked[i, j] = false;
    //             console.log(upgradeUnlocked[i, j]);
    //         }
    //     }
    // }
    // initialise(8, 3);
    // unlockUpgrade = (btn, unlock) => {
    //     console.log("Upgrade " + unlock + " unlocked for Button " + btn + "!");
    //     upgradeUnlocked[btn, unlock] = true;
    // }

    incrementCounter = (counter, i) => {
        return counter + i;
    }

    $("button").click(function () {
        var clickedButton = $(this).attr("id");
        for (let i = 0; i < 8; i++) {
            if (clickers[i].id === clickedButton) {
                clickers[i].count = incrementCounter(clickers[i].count, 5);
                $(this).text(clickers[i].count.toString())
            }
        }
    })

});