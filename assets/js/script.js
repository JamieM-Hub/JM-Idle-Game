$(document).ready(function () {

    // VARIABLES

    function Clicker(id, color, count, T_count, currentLevel, upgradeLevels) {
        this.id = id;
        this.color = color;
        this.count = count;
        this.T_count = T_count;
        this.currentLevel = currentLevel;
        this.upgradeLevels = upgradeLevels;
        this.Upgrade = () => {
            clickerUpgrade(this)
        }
    }

    var nextLevel = 100
    var totalScore = 0

    var clickerOne = new Clicker("one", "red", 0, 0, 1, [3, 6, 10]);
    var clickerTwo = new Clicker("two", "green", 0, 0, 1, [3, 6, 10]);
    var clickerThree = new Clicker("three", "green", 0, 0, 1, [3, 6, 10]);
    var clickerFour = new Clicker("four", "green", 0, 0, 1, [3, 6, 10]);
    var clickerFive = new Clicker("five", "green", 0, 0, 1, [3, 6, 10]);
    var clickerSix = new Clicker("six", "green", 0, 0, 1, [3, 6, 10]);
    var clickerSeven = new Clicker("seven", "green", 0, 0, 1, [3, 6, 10]);
    var clickerEight = new Clicker("eight", "green", 0, 0, 1, [3, 6, 10]);

    let clickers = [clickerOne, clickerTwo, clickerThree, clickerFour, clickerFive, clickerSix, clickerSeven, clickerEight]

    // FUNCTIONS

    incrementCount = (count, i, id) => {
        count += i
        $("." + id + " > .clickerCount").text(count.toString() + " / " + nextLevel)
        $(".row > ." + id).text(count.toString())
        totalScore += i
        $(".totalScore").text(totalScore.toString())
        return count
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

    animateButton = (btn, id) => {
        // $(btn).animate({
        //     width: '+=10%',
        //     height: '-=10%'
        // })
        //     $(btn).animate({
        //         width: '-=20%',
        //         height: '+=20%'
        //     })
        //     $(btn).animate({
        //         width: '+=10%',
        //         height: '-=10%'
        //     })

    }

    detectClicker = (btn, clickers) => {
        var clickedClicker
        for (let i = 0; i < 8; i++) {
            if (clickers[i].id === btn.id) {
                clickedClicker = clickers[i]
            }
        }
        return clickedClicker
    }

    processClick = (btn, clicker) => {
       clicker.count = incrementCount(clicker.count, 1, clicker.id)
    }

    // EVENTS

    // listen to clicks on any button
    $("button").click(function () {
        animateButton(this, this.id)

        // store selected clicker and process
        var clickedClicker = detectClicker(this, clickers)
        processClick(this, clickedClicker)

    })

});