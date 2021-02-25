$(document).ready(function () {

    // VARIABLES
    const GAME_TITLE = "IDLE Game"
    const CONTACT_EMAIL = "jamiemckenzie7231@yahoo.co.uk"
    const NUM_ELEMENTS = 8
    const NUM_ACHIEVEMENTS = 24
    const MAX_LEVEL = 10
    const MAX_THEMES = 10
    const MAX_UPGRADES = (NUM_ELEMENTS * 3) /* elements x upgrades */

    function Clicker(id, color, upgradeLevel, iStart, theme) {
        this.id = id
        this.color = color
        this.count = 0
        this.count_T = 0
        this.currentLevel = 0
        this.upgradeLevel = upgradeLevel
        this.nextLevel = this.upgradeLevel[this.currentLevel]
        this.i = iStart
        this.theme = theme
        this.themeUnlocked = false
        this.levelUp = () => {
            this.currentLevel++;
            console.log("Level Up!", this.currentLevel)
            this.count -= this.nextLevel
            this.nextLevel = this.upgradeLevel[this.currentLevel]
            if (this.currentLevel == 1) {
                $(".row > ." + id).parent().parent().removeClass("d-none")
                $("." + this.id + " > .clickerLevel").removeClass("d-none")
                $("." + this.id + " > .clickerCount").removeClass("d-none")
                $("." + this.id + " > .clickerLevel").text("Level 1")
                $("." + this.id + " > .clickerCount").text("UNLOCK!")
                $(".row > ." + id).text("UNLOCK!")
            }
            if ((this.currentLevel > 1) && (this.currentLevel < MAX_LEVEL)) {
                console.log("current level " + this.currentLevel + " is above 1 and below 10")
                if (this.currentLevel == 3) this.i = unlockUpgrade(1, this.i, this.id)
                if (this.currentLevel == 5) this.i = unlockUpgrade(2, this.i, this.id)
                if (this.currentLevel == 7) this.i = unlockUpgrade(3, this.i, this.id)
                $("." + this.id + " > .clickerLevel").text("Level " + this.currentLevel)
                $("." + this.id + " > .clickerCount").text("LEVEL UP!")
                $(".col-3." + this.id).text("LEVEL UP!")
            }
            if (this.currentLevel == MAX_LEVEL) {
                console.log(this.id + " max level!")
                this.unlockTheme(this.theme)
                console.log($("#" + this.id + " > .clickerLevel"))
                $("#" + this.id + " > .clickerLevel").text("Level MAX")
                $("." + this.id + " > .clickerCount").text("COMPLETE!")
            }
            changeIncrement(this.id, this.i)
        }
        this.unlockTheme = (theme) => {
            if (maxCount == 0) {
                $("#defaultTheme").text("default")
            }
            this.themeUnlocked = true
            maxCount++
            $("#" + this.theme).text(this.id)
            console.log(this.id + " theme unlocked!")
            animateThemesButton(this.color)
        }
    }

    // VARIABLES
    let unlockLevel = [1, 2, 50, 100, 200, 500, 1000, 2000]
    var currentRank = 0
    var unlocked = [];
    for (i = 0; i < NUM_ELEMENTS; i++) {
        unlocked[i] = false
    }
    var achievementUnlocked = [];
    for (i = 0; i < NUM_ACHIEVEMENTS; i++) {
        achievementUnlocked[i] = false
    }
    var totalScore = 0
    var totalClicks = 0
    var firstUpgradeUnlocked = false
    var firstThemeChange = false
    var clickDeveloper = false
    var themeCount = 0
    var currentTheme = 'defaultTheme'
    var maxCount = 0
    var upgradeCount = 0
    var fire = new Clicker("fire", "red", [1, 10, 30, 50, 75, 250, 400, 1000, 1500, 2500], 1, "fireTheme")
    var water = new Clicker("water", "blue", [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 2, "waterTheme")
    var wind = new Clicker("wind", "lightgray", [4, 50, 80, 120, 1, 1, 1, 1, 1, 1], 4, "windTheme")
    var earth = new Clicker("earth", "brown", [8, 75, 1000, 2000, 1, 1, 1, 1, 1, 1], 8, "earthTheme")
    var electron = new Clicker("electron", "yellow", [16, 500, 1250, 2500, 1, 1, 1, 1, 1, 1], 16, "electronTheme")
    var nucleus = new Clicker("nucleus", "green", [32, 750, 1500, 3000, 1, 1, 1, 1, 1, 1], 32, "nucleusTheme")
    var gravity = new Clicker("gravity", "black", [64, 1000, 2000, 3500, 1, 1, 1, 1, 1, 1], 64, "gravityTheme")
    var darkMatter = new Clicker("darkMatter", "purple", [128, 1250, 2500, 5000, 1, 1, 1, 1, 1, 1], 128, "darkMatterTheme")
    let clickers = [fire, water, wind, earth, electron, nucleus, gravity, darkMatter]

    // FUNCTIONS

    debug = () => {
        for (i = 0; i < NUM_ELEMENTS; i++) {
            unlocked[i] = true
            clickers[i].unlockTheme()
        }
        maxCount = 8
        checkAchievement()

    }

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
        if (!firstUpgradeUnlocked && (level = 1)) {
            firstUpgradeUnlocked = true
        }
        $(".row > ." + id).siblings(".upgrade-" + n).removeClass("d-none")
        upgradeCount++;
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

    checkRank = (totalScore) => {
        if (totalScore >= unlockLevel[currentRank]) {
            currentRank++
            $(".rankRank").text("Rank " + currentRank)
        }
    }

    checkUnlock = (totalScore) => {
        console.log("check unlock")
        if ((totalScore >= unlockLevel[1]) && !unlocked[1]) {
            unlocked[1] = true;
            unlockClicker("water")
        }
        if ((totalScore >= unlockLevel[2]) && !unlocked[2]) {
            unlocked[2] = true;
            unlockClicker("wind")
        }
        if ((totalScore >= unlockLevel[3]) && !unlocked[3]) {
            unlocked[3] = true;
            unlockClicker("earth")
        }
        if ((totalScore >= unlockLevel[4]) && !unlocked[4]) {
            console.log("unlock electron")
            unlocked[4] = true;
            unlockClicker("electron")
        }
        if ((totalScore >= unlockLevel[5]) && !unlocked[5]) {
            unlocked[5] = true;
            unlockClicker("nucleus")
        }
        if ((totalScore >= unlockLevel[6]) && !unlocked[6]) {
            unlocked[6] = true;
            unlockClicker("gravity")
        }
        if ((totalScore >= unlockLevel[7]) && !unlocked[7]) {
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
        if (!achievementUnlocked[7] && firstUpgradeUnlocked) {
            achievementUnlocked[7] = true
            $(".firstUpgrade").parent().removeClass("d-none")
            console.log("achievement 7 (First Upgrade) unlocked!")
        }
        // Unlock All Upgrades
        if (!achievementUnlocked[8] && (upgradeCount == MAX_UPGRADES)) {
            achievementUnlocked[8] = true
            $(".maxUpgrade").parent().removeClass("d-none")
            console.log("achievement 8 (Unlock All Upgrades) unlocked!")
        }
        if (!achievementUnlocked[9] && (unlocked[4] == true)) {
            achievementUnlocked[9] = true
            $(".unlockElectron").parent().removeClass("d-none")
            console.log("achievement 9 (Unlock Electron) unlocked!")
        }
        if (!achievementUnlocked[10] && (unlocked[7] == true)) {
            achievementUnlocked[10] = true
            $(".unlockDarkMatter").parent().removeClass("d-none")
            console.log("achievement 10 (Unlock Dark Matter) unlocked!")
        }
        if (!achievementUnlocked[11] && (fire.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[11] = true
            $(".completeFire").parent().removeClass("d-none")
            console.log("achievement 11 (Complete Fire) unlocked!")
        }
        if (!achievementUnlocked[12] && (water.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[12] = true
            $(".completeWater").parent().removeClass("d-none")
            console.log("achievement 12 (Complete Water) unlocked!")
        }
        if (!achievementUnlocked[13] && (wind.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[13] = true
            $(".completeWind").parent().removeClass("d-none")
            console.log("achievement 13 (Complete Wind) unlocked!")
        }
        if (!achievementUnlocked[14] && (earth.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[14] = true
            $(".completeEarth").parent().removeClass("d-none")
            console.log("achievement 14 (Complete Earth) unlocked!")
        }
        if (!achievementUnlocked[15] && (electron.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[15] = true
            $(".completeElectron").parent().removeClass("d-none")
            console.log("achievement 15 (Complete Electron) unlocked!")
        }
        if (!achievementUnlocked[16] && (nucleus.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[16] = true
            $(".completeNucleus").parent().removeClass("d-none")
            console.log("achievement 16 (Complete Nucleus) unlocked!")
        }
        if (!achievementUnlocked[17] && (gravity.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[17] = true
            $(".completeGravity").parent().removeClass("d-none")
            console.log("achievement 17 (Complete Gravity) unlocked!")
        }
        if (!achievementUnlocked[18] && (darkMatter.currentLevel == MAX_LEVEL)) {
            achievementUnlocked[18] = true
            $(".completeDarkMatter").parent().removeClass("d-none")
            console.log("achievement 18 (Complete Dark Matter) unlocked!")
        }
        if (!achievementUnlocked[19] && (firstThemeChange == true)) {
            achievementUnlocked[19] = true
            $(".changeTheme").parent().removeClass("d-none")
            console.log("achievement 19 (Change Theme) unlocked!")
        }
        if (!achievementUnlocked[20] && (clickDeveloper == true)) {
            achievementUnlocked[20] = true
            $(".clickDeveloper").parent().removeClass("d-none")
            console.log("achievement 20 (Click Developer) unlocked!")
        }
        if (!achievementUnlocked[21] && (themeCount == MAX_THEMES)) {
            achievementUnlocked[21] = true
            $(".tryAllThemes").parent().removeClass("d-none")
            console.log("achievement 21 (Try All Themes) unlocked!")
        }
        if (!achievementUnlocked[22] && (maxCount == NUM_ELEMENTS)) {
            achievementUnlocked[22] = true
            $(".completeAll").parent().removeClass("d-none")
            console.log("achievement 22 (Complete All Elements) unlocked!")
            $("#ultimaTheme").text("ultima")
            console.log("ULTIMA theme unlocked!")
        }
        // if (!achievementUnlocked[23] && ()) {
        //     achievementUnlocked[23] = true
        //     $(".secret1").parent().removeClass("d-none")
        //     console.log("achievement 23 (Secret 1) unlocked!")
        // }
        // if (!achievementUnlocked[24] && ()) {
        //     achievementUnlocked[24] = true
        //     $(".secret2").parent().removeClass("d-none")
        //     console.log("achievement 24 (Secret 2) unlocked!")
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

    animateThemesButton = (color) => {
        var button = $("#themesButton")
        button.css("background-color", color)
        // button.animate({height: '120%', width: '120%'}, "fast");
        // button.animate({height: '100%', width: '100%'}, 1000); 
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
        // animateButton(this, this.id)
        totalClicks = incrementTotalClicks(totalClicks)
        clicker.count = incrementCount(clicker.count, clicker.i, clicker.nextLevel, clicker.id)
        clicker.count_T = incrementCount_T(clicker.count_T, clicker.i, clicker.id)
        totalScore = incrementTotalScore(totalScore, clicker.i)
        checkLevel(clicker)
        checkRank(totalScore)
        checkUnlock(totalScore)
        checkAchievement()
    }

    // CLICKERS
    $(".clicker").click(function () {
        var clickedClicker = detectClicker(this, clickers)
        // console.log(clickedClicker.currentLevel)

        if (clickedClicker.currentLevel < MAX_LEVEL) {
            processClick(clickedClicker)
        }


    })

    // DEVELOPER BUTTON
    $("#developerButton").click(function () {
        clickDeveloper = true
        checkAchievement()
    })

    // THEMES
    defaultTheme = () => {
        if (currentTheme != "defaultTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("defaultTheme")
            $(".modal-content").addClass("defaultTheme")
            currentTheme = "defaultTheme"
        }
    }
    fireTheme = () => {
        if (currentTheme != "fireTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("fireTheme")
            $(".modal-content").addClass("fireTheme")
            currentTheme = "fireTheme"
        }
    }
    waterTheme = () => {
        if (currentTheme != "waterTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("waterTheme")
            $(".modal-content").addClass("waterTheme")
            currentTheme = "waterTheme"
        }
    }
    windTheme = () => {
        if (currentTheme != "windTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("windTheme")
            $(".modal-content").addClass("windTheme")
            currentTheme = "windTheme"
        }
    }
    earthTheme = () => {
        if (currentTheme != "earthTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("earthTheme")
            $(".modal-content").addClass("earthTheme")
            currentTheme = "earthTheme"
        }
    }
    electronTheme = () => {
        if (currentTheme != "electronTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("electronTheme")
            $(".modal-content").addClass("electronTheme")
            currentTheme = "electronTheme"

        }
    }
    nucleusTheme = () => {
        if (currentTheme != "nucleusTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("nucleusTheme")
            $(".modal-content").addClass("nucleusTheme")
            currentTheme = "nucleusTheme"
        }
    }
    gravityTheme = () => {
        if (currentTheme != "gravityTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("gravityTheme")
            $(".modal-content").addClass("gravityTheme")
            currentTheme = "gravityTheme"
        }
    }
    darkMatterTheme = () => {
        if (currentTheme != "darkMatterTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("darkMatterTheme")
            $(".modal-content").addClass("darkMatterTheme")
            currentTheme = "darkMatterTheme"
        }
    }
    ultimaTheme = () => {
        if (currentTheme != "ultimaTheme") {
            $("body").removeClass(currentTheme)
            $(".modal-content").removeClass(currentTheme)
            $("body").addClass("ultimaTheme")
            $(".modal-content").addClass("ultimaTheme")
            currentTheme = "ultimaTheme"
        }
    }

    $(".themeButton").click(function () {
        // console.log(this.id + " clicked")
        if (this.id == "defaultTheme") {
            if (maxCount > 0) {
                // console.log("maxCount > 0")
                var selectTheme = window["defaultTheme"] /* adapted from code @ "https://www.viralpatel.net/calling-javascript-function-from-string/" */
                selectTheme();
                console.log("change theme to default")
            }
        } else if (this.id == "ultimaTheme") {
            ultimaTheme()
            console.log("change theme to Ultima")
        } else {
            var selectedTheme = this.id.substring(0, (this.id.length - 5)) /* take element name from button id" */
            for (i = 0; i < NUM_ELEMENTS; i++) {
                if ((clickers[i].id == selectedTheme) && (this.id != currentTheme) && clickers[i].themeUnlocked) {
                    console.log("change theme to " + selectedTheme)
                    var selectTheme = window[this.id]; /* adapted from code @ "https://www.viralpatel.net/calling-javascript-function-from-string/" */
                    selectTheme();
                }
            }
        }
    })

    // JQUERY STYLE + CONTENT
    $("body").addClass("defaultTheme")
    $(".gameTitle").text(GAME_TITLE)
    $(".email").text(CONTACT_EMAIL)

    // debug()
})