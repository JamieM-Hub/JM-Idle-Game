$(document).ready(function () {

    // VARIABLES

    function Clicker(id, color, upgradeLevels, iLevels) {
        this.id = id
        this.color = color
        this.count = 0
        this.count_T = 0
        this.currentLevel = 1
        this.upgradeLevels = upgradeLevels
        this.nextLevel = this.upgradeLevels[this.currentLevel]
        this.iLevels = iLevels
        this.i = this.iLevels[this.currentLevel]
        this.levelUp = () => {
            this.count -= this.nextLevel
            $("." + this.id + " > .clickerCount").text("LEVEL UP!")
            this.currentLevel++;
            this.nextLevel = this.upgradeLevels[this.currentLevel]
            this.i = this.iLevels[this.currentLevel]
            console.log("level up")
        }
    }

    var totalScore = 0

    var clickerOne = new Clicker("one", "red", [0, 20, 100, 300], [0, 1, 1.5, 2])
    var clickerTwo = new Clicker("two", "green", [0, 50, 250, 1000], [0, 1.5, 2, 2.5])
    var clickerThree = new Clicker("three", "blue", [0, 100, 500, 1500], [0, 2, 3, 4])
    var clickerFour = new Clicker("four", "orange", [0, 300, 1000, 2000], [0, 3, 5, 7])
    var clickerFive = new Clicker("five", "green", [3, 6, 10], [0, 3, 5, 7])
    var clickerSix = new Clicker("six", "green", [3, 6, 10], [0, 3, 5, 7])
    var clickerSeven = new Clicker("seven", "green", [3, 6, 10], [0, 3, 5, 7])
    var clickerEight = new Clicker("eight", "green", [3, 6, 10], [0, 3, 5, 7])

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

    checkLevel = (clicker) => {
        if (clicker.count >= clicker.nextLevel) { clicker.levelUp() }
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

    processClick = (clicker) => {
        clicker.count = incrementCount(clicker.count, clicker.i, clicker.nextLevel, clicker.id)
        clicker.count_T = incrementCount_T(clicker.count_T, clicker.i, clicker.id)
        totalScore = incrementTotalScore(totalScore, clicker.i)
        checkLevel(clicker)

    }

    // EVENTS

    // listen for clicks on any clicker button
    $(".clickerButton").click(function () {
        animateButton(this, this.id)

        // store selected clicker and process
        var clickedClicker = detectClicker(this, clickers)
        processClick(clickedClicker)

    })

});