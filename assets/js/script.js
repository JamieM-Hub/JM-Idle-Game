$(document).ready(function () {

    // VARIABLES

    function Clicker(id, color, upgradeLevel, iLevel) {
        this.id = id
        this.color = color
        this.count = 0
        this.count_T = 0
        this.currentLevel = 0
        this.upgradeLevel = upgradeLevel
        this.nextLevel = this.upgradeLevel[this.currentLevel]
        this.iLevel = iLevel
        this.i = this.iLevel[this.currentLevel]
        this.levelUp = () => {
            unlockUpgrade(this.id, this.currentLevel)
            this.currentLevel++;
            this.count -= this.nextLevel
            this.nextLevel = this.upgradeLevel[this.currentLevel]
            this.i = this.iLevel[this.currentLevel]
            $("." + this.id + " > .clickerLevel").text("Level " + this.currentLevel)
            $("." + this.id + " > .clickerCount").text("LEVEL UP!")
        }
    }
    let unlockLevel = [1, 20, 50, 80, 100, 125, 150, 200]
    let unlocked = [false]
    var totalScore = 0

    var fire = new Clicker("fire", "red", [0, 20, 50, 100], [0, 10, 1.5, 2])
    var water = new Clicker("water", "aqua", [0, 50, 250, 1000], [0, 1.5, 2, 2.5])
    var wind = new Clicker("wind", "lightgray", [0, 100, 500, 1500], [0, 2, 3, 4])
    var earth = new Clicker("earth", "brown", [0, 300, 1000, 2000], [0, 3, 5, 7])
    var electron = new Clicker("electron", "yellow", [0, 500, 1250, 2500], [0, 5, 7, 10])
    var nucleus = new Clicker("nucleus", "green", [0, 750, 1500, 3000], [0, 7, 10, 12])
    var gravity = new Clicker("gravity", "black", [0, 1000, 2000, 3500], [0, 10, 12, 15])
    var darkMatter = new Clicker("darkMatter", "purple", [0, 1250, 2500, 5000], [0, 15, 17, 20])

    let clickers = [fire, water, wind, earth, electron, nucleus, gravity, darkMatter]

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

    unlockUpgrade = (id, level) => {
        $(".row > ." + id).siblings(".upgrade-" + level).removeClass("d-none")
        console.log(id, level)
    }

    unlockClicker = (id) => {
        $(".clicker." + id).parent().removeClass("d-none")
        $(".row > ." + id).parent().parent().removeClass("d-none") 
        $(".row > ." + id).text("UNLOCK!")
        $("." + id + " > .clickerCount").text("UNLOCK!")
    }

    checkLevel = (clicker) => {
        if (clicker.count >= clicker.nextLevel) { clicker.levelUp() }
    }

    checkUnlock = (totalScore) => {
        if (totalScore >= unlockLevel[1] && !unlocked[1]) { 
            unlocked[1] = true;
            unlockClicker("water")
        }
        if (totalScore >= unlockLevel[2] && !unlocked[2]) { 
            unlocked[2] = true;
            unlockClicker("wind")
        }
        if (totalScore >= unlockLevel[3] && !unlocked[3]) { 
            unlocked[3] = true;
            unlockClicker("earth")
        }
        if (totalScore >= unlockLevel[4] && !unlocked[4]) { 
            unlocked[4] = true;
            unlockClicker("electron") 
        }
        if (totalScore >= unlockLevel[5] && !unlocked[5]) { 
            unlocked[5] = true;
            unlockClicker("nucleus")
        }
        if (totalScore >= unlockLevel[6] && !unlocked[6]) { 
            unlocked[6] = true;
            unlockClicker("gravity")
        }
        if (totalScore >= unlockLevel[7] && !unlocked[7]) { 
            unlocked[7] = true;
            unlockClicker("darkMatter")
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


    $(".achievement").parent().removeClass("d-none")

});