$(document).ready(function () {

    // VARIABLES

    let MAX_LEVEL = 10

    function Clicker(id, color, upgradeLevel, iStart) {
        this.id = id
        this.color = color
        this.count = 0
        this.count_T = 0
        this.currentLevel = 0
        this.upgradeLevel = upgradeLevel
        this.nextLevel = this.upgradeLevel[this.currentLevel]
        this.i = iStart
        this.levelUp = () => {
            this.currentLevel++;
            this.count -= this.nextLevel
            this.nextLevel = this.upgradeLevel[this.currentLevel]
            if (this.currentLevel == 1) {
                $(".row > ." + id).parent().parent().removeClass("d-none")
                $("." + this.id + " > .clickerLevel").removeClass("d-none")
                $("." + this.id + " > .clickerCount").removeClass("d-none")
            }
            if (this.currentLevel == 3) this.i = unlockUpgrade(1, this.i, this.id)
            if (this.currentLevel == 5) this.i = unlockUpgrade(2, this.i, this.id)
            if (this.currentLevel == 7) this.i = unlockUpgrade(3, this.i, this.id)
            if (this.currentLevel == MAX_LEVEL) this.unlockTheme()

            //this.i *= this.multiplier
            changeIncrement(this.id, this.i)

            if (this.currentLevel == MAX_LEVEL) {
                $("." + this.id + " > .clickerLevel").text("Level MAX")
                $("." + this.id + " > .clickerCount").text("COMPLETE!")
            } else if (this.currentLevel == 1) {
                $("." + this.id + " > .clickerLevel").text("Level 1")
                $("." + this.id + " > .clickerCount").text("UNLOCK!")
                $(".row > ." + id).text("UNLOCK!")
            } else {
                $("." + this.id + " > .clickerLevel").text("Level " + this.currentLevel)
                $("." + this.id + " > .clickerCount").text("LEVEL UP!")
                $(".col-3." + this.id).text("LEVEL UP!")
            }


        }
        this.unlockTheme = () => {

        }
    }
    let unlockLevel = [1, 20, 50, 80, 100, 125, 150, 200]
    var unlocked = [false]
    var achievementUnlocked = [false]
    var totalScore = 0
    var totalClicks = 0
    // var firstUpgradeUnlocked = false


    var fire = new Clicker("fire", "red", [1, 10, 30, 50, 75, 250, 400, 1000, 1500, 2500], 1)
    var water = new Clicker("water", "aqua", [1, 30, 50, 80, 1, 1, 1, 1, 1, 1], 2)
    var wind = new Clicker("wind", "lightgray", [1, 50, 80, 120, 1, 1, 1, 1, 1, 1], 4)
    var earth = new Clicker("earth", "brown", [1, 75, 1000, 2000, 1, 1, 1, 1, 1, 1], 8)
    var electron = new Clicker("electron", "yellow", [1, 500, 1250, 2500, 1, 1, 1, 1, 1, 1], 16)
    var nucleus = new Clicker("nucleus", "green", [1, 750, 1500, 3000, 1, 1, 1, 1, 1, 1], 32)
    var gravity = new Clicker("gravity", "black", [1, 1000, 2000, 3500, 1, 1, 1, 1, 1, 1], 64)
    var darkMatter = new Clicker("darkMatter", "purple", [1, 1250, 2500, 5000, 1, 1, 1, 1, 1, 1], 128)

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

    incrementTotalClicks = (totalClicks) => {
        totalClicks++
        $(".totalClicks").text(totalClicks.toString())
        return totalClicks
    }

    changeIncrement = (id, i) => {
        $(".row > ." + id).prev().text("+" + i)

    }

    unlockUpgrade = (n, i, id) => {
        // if (!firstUpgradeUnlocked && (level = 1)) firstUpgradeUnlocked = true
        $(".row > ." + id).siblings(".upgrade-" + n).removeClass("d-none")
        if (n == 1) i *= 2
        if (n == 2) i *= 3
        if (n == 3) i *= 5
        //i = roundtoDecimalPlace(i, 2)
        return i
    }

    roundtoDecimalPlace = (number, places) => {
        if (places >= 1) {
            var whole = number
            var int = Math.floor(whole)
            whole = whole - int /* leaves a decimal between 0-1 */
            whole = Math.round((whole) * (10 ^ (places))) / (10 ^ (places))
            console.log(whole, int)
            number = int + whole
            console.log(number)
        }
        return number
    }

    unlockClicker = (id) => {
        $(".clicker." + id).parent().removeClass("d-none")

        // $(".row > ." + this.id).text("UNLOCK!")
        $("." + this.id + " > .clickerCount").text("UNLOCK!")
    }

    checkLevel = (clicker) => {
        if (clicker.count >= clicker.nextLevel) {
            clicker.levelUp()
        }
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

    checkAchievement = () => {

        // First Click
        if (!achievementUnlocked[1] && (totalClicks >= 1)) {
            achievementUnlocked[1] = true
            $(".firstClick").parent().removeClass("d-none")
            console.log("achievement 1 (First Click) unlocked!")
        }
        // 50 Clicks
        if (!achievementUnlocked[2] && (totalClicks >= 50)) {
            achievementUnlocked[2] = true
            $(".clicks_50").parent().removeClass("d-none")
            console.log("achievement 2 (50 Clicks) unlocked!")
        }
        // 100 Clicks
        if (!achievementUnlocked[3] && (totalClicks >= 100)) {
            achievementUnlocked[3] = true
            $(".clicks_100").parent().removeClass("d-none")
            console.log("achievement 3 (100 Clicks) unlocked!")
        }
        // 250 Clicks
        if (!achievementUnlocked[4] && (totalClicks >= 250)) {
            achievementUnlocked[4] = true
            $(".clicks_250").parent().removeClass("d-none")
            console.log("achievement 4 (250 Clicks) unlocked!")
        }
        // 500 Clicks
        if (!achievementUnlocked[5] && (totalClicks >= 500)) {
            achievementUnlocked[5] = true
            $(".clicks_500").parent().removeClass("d-none")
            console.log("achievement 5 (500 Clicks) unlocked!")
        }
        // 1000 Clicks
        if (!achievementUnlocked[6] && (totalClicks >= 1000)) {
            achievementUnlocked[6] = true
            $(".clicks_1000").parent().removeClass("d-none")
            console.log("achievement 6 (1000 Clicks) unlocked!")
        }
        // First Upgrade
        // if (!achievementUnlocked[6] && firstUpgradeUnlocked) {
        //     achievementUnlocked[6] = true
        //     $(".firstUpgrade").parent().removeClass("d-none")
        //     console.log("achievement 7 (First Upgrade) unlocked!")
        // }
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
        totalClicks = incrementTotalClicks(totalClicks);
        // store selected clicker and process
        var clickedClicker = detectClicker(this, clickers)
        processClick(clickedClicker)
        checkUnlock(totalScore)
        checkAchievement()
    })

    // ADDING CLICKERS + TRACKERS

    $(".clicker.one").parent().removeClass("d-none")
    $(":contains('TRACKER A')").parent().parent().removeClass("d-none")

    // $(".achievement").parent().removeClass("d-none")

});