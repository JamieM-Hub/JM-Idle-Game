$(document).ready(function () {

    // VARIABLES

    function Clicker(id, color, count, count_T, currentLevel, upgradeLevels) {
        this.id = id
        this.color = color
        this.count = count
        this.count_T = count_T
        this.currentLevel = currentLevel
        this.upgradeLevels = upgradeLevels
        this.nextLevel = this.upgradeLevels[0]
        this.Upgrade = () => {
            clickerUpgrade(this)
        }
    }

    var totalScore = 0

    var clickerOne = new Clicker("one", "red", 0, 0, 1, [20, 100, 300])
    var clickerTwo = new Clicker("two", "green", 0, 0, 1, [50, 250, 1000])
    var clickerThree = new Clicker("three", "blue", 0, 0, 1, [100, 500, 1500])
    var clickerFour = new Clicker("four", "orange", 0, 0, 1, [300, 1000, 2000])
    var clickerFive = new Clicker("five", "green", 0, 0, 1, [3, 6, 10])
    var clickerSix = new Clicker("six", "green", 0, 0, 1, [3, 6, 10])
    var clickerSeven = new Clicker("seven", "green", 0, 0, 1, [3, 6, 10])
    var clickerEight = new Clicker("eight", "green", 0, 0, 1, [3, 6, 10])

    let clickers = [clickerOne, clickerTwo, clickerThree, clickerFour, clickerFive, clickerSix, clickerSeven, clickerEight]

    // FUNCTIONS

    incrementCount = (count, i, nextLevel, id) => {
        count += i
        $("." + id + " > .clickerCount").text(count.toString() + " / " + nextLevel)
        return count
    }

    incrementCount_T = (count_T, i, id) => {
        count_T += i
        $(".row > ." + id).text(count_T.toString())
        return count_T
    }

    incrementTotalScore = (totalScore, i) => {
        totalScore += i
        $(".totalScore").text(totalScore.toString())
        return totalScore
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
       clicker.count = incrementCount(clicker.count, 1, clicker.nextLevel, clicker.id)
       clicker.count_T = incrementCount_T(clicker.count_T, 1, clicker.id)
       totalScore = incrementTotalScore(totalScore, 1)
    }

    // EVENTS

    // listen for clicks on any clicker button
    $(".clickerButton").click(function () {
        animateButton(this, this.id)

        // store selected clicker and process
        var clickedClicker = detectClicker(this, clickers)
        processClick(this, clickedClicker)

    })

});