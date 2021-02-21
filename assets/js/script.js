$(document).ready(function () {

    // VARIABLES

    function Clicker(id, color, upgradeLevel, iLevel) {
        this.id = id
        this.color = color
        this.count = 0
        this.count_T = 0
        this.currentLevel = 1
        this.upgradeLevel = upgradeLevel
        this.nextLevel = this.upgradeLevel[this.currentLevel]
        this.iLevel = iLevel
        this.i = this.iLevel[this.currentLevel]
        this.levelUp = () => {
            this.currentLevel++;
            this.count -= this.nextLevel
            this.nextLevel = this.upgradeLevel[this.currentLevel]
            this.i = this.iLevel[this.currentLevel]
            $("." + this.id + " > .clickerCount").text("LEVEL UP!")
        }
    }
    let unlockLevel = [1, 20, 50, 80, 100, 125, 150, 200]
    let unlocked = [false]
    var totalScore = 0

    var clickerOne = new Clicker("one", "red", [0, 20, 100, 300], [0, 1, 1.5, 2])
    var clickerTwo = new Clicker("two", "green", [0, 50, 250, 1000], [0, 1.5, 2, 2.5])
    var clickerThree = new Clicker("three", "blue", [0, 100, 500, 1500], [0, 2, 3, 4])
    var clickerFour = new Clicker("four", "orange", [0, 300, 1000, 2000], [0, 3, 5, 7])
    var clickerFive = new Clicker("five", "green", [0, 500, 1250, 2500], [0, 5, 7, 10])
    var clickerSix = new Clicker("six", "green", [0, 750, 1500, 3000], [0, 7, 10, 12])
    var clickerSeven = new Clicker("seven", "green", [0, 1000, 2000, 3500], [0, 10, 12, 15])
    var clickerEight = new Clicker("eight", "green", [0, 1250, 2500, 5000], [0, 15, 17, 20])

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

    unlockClicker = (id, tName) => {
        $(".clicker." + id).removeClass("d-none")
        $(":contains(" + tName + ")").parent().parent().removeClass("d-none") 
        $(".row > ." + id).text("UNLOCK!")
        $("." + id + " > .clickerCount").text("UNLOCK!")
    }

    checkLevel = (clicker) => {
        if (clicker.count >= clicker.nextLevel) { clicker.levelUp() }
    }

    checkUnlock = (totalScore) => {
        if (totalScore >= unlockLevel[1] && !unlocked[1]) { 
            unlocked[1] = true;
            unlockClicker("two", "TRACKER B")
        }
        if (totalScore >= unlockLevel[2] && !unlocked[2]) { 
            unlocked[2] = true;
            unlockClicker("three", "TRACKER C")
        }
        if (totalScore >= unlockLevel[3] && !unlocked[3]) { 
            unlocked[3] = true;
            unlockClicker("four", "TRACKER D")
        }
        if (totalScore >= unlockLevel[4] && !unlocked[4]) { 
            unlocked[4] = true;
            unlockClicker("five", "TRACKER E") 
        }
        if (totalScore >= unlockLevel[5] && !unlocked[5]) { 
            unlocked[5] = true;
            unlockClicker("six", "TRACKER F")
        }
        if (totalScore >= unlockLevel[6] && !unlocked[6]) { 
            unlocked[6] = true;
            unlockClicker("seven", "TRACKER G")
        }
        if (totalScore >= unlockLevel[7] && !unlocked[7]) { 
            unlocked[7] = true;
            unlockClicker("eight", "TRACKER H")
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

    processClick = (clicker) => {
        clicker.count = incrementCount(clicker.count, clicker.i, clicker.nextLevel, clicker.id)
        clicker.count_T = incrementCount_T(clicker.count_T, clicker.i, clicker.id)
        totalScore = incrementTotalScore(totalScore, clicker.i)
        checkLevel(clicker)
    }

    // EVENTS

    // listen for clicks on any clicker button
    $(".clicker").click(function () {
        animateButton(this, this.id)

        // store selected clicker and process
        var clickedClicker = detectClicker(this, clickers)
        processClick(clickedClicker)
        checkUnlock(totalScore)

    })

    // ADDING CLICKERS + TRACKERS

    $(".clicker.one").parent().removeClass("d-none")
    $(":contains('TRACKER A')").parent().parent().removeClass("d-none")


});