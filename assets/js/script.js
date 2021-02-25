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
    var fire = new Clicker("fire", "red", [1, 10, 30, 50, 75, 250, 400, 1000, 1500, 2500], 1, "fireTheme")
    var water = new Clicker("water", "blue", [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 2, "waterTheme")
    var wind = new Clicker("wind", "lightgray", [4, 50, 80, 120, 1, 1, 1, 1, 1, 1], 4, "windTheme")
    var earth = new Clicker("earth", "brown", [8, 75, 1000, 2000, 1, 1, 1, 1, 1, 1], 8, "earthTheme")
    var electron = new Clicker("electron", "yellow", [16, 500, 1250, 2500, 1, 1, 1, 1, 1, 1], 16, "electronTheme")
    var nucleus = new Clicker("nucleus", "green", [32, 750, 1500, 3000, 1, 1, 1, 1, 1, 1], 32, "nucleusTheme")
    var gravity = new Clicker("gravity", "black", [64, 1000, 2000, 3500, 1, 1, 1, 1, 1, 1], 64, "gravityTheme")
    var darkMatter = new Clicker("darkMatter", "purple", [128, 1250, 2500, 5000, 1, 1, 1, 1, 1, 1], 128, "darkMatterTheme")
    let clickers = [fire, water, wind, earth, electron, nucleus, gravity, darkMatter]

    function Achievement(name, id, text, img) {
        this.name = name
        this.id = id
        this.text = id
        this.img = img
        this.unlocked = false
    }
    var firstClick = new Achievement("First Click", "firstClick", "You clicked a button. Wow!", "1")
    var clicks_50 = new Achievement("50 Clicks", "clicks_50", "You clicked 50 buttons. Impressive!", "2")
    var clicks_100 = new Achievement("100 Clicks", "clicks_100", "You clicked 100 buttons. Superb!", "3")
    var clicks_250 = new Achievement("250 Clicks", "clicks_250", "You clicked 250 buttons. Prodigous!", "4")
    var clicks_500 = new Achievement("500 Clicks", "clicks_500", "You clicked 500 buttons. Godlike!", "5")
    var clicks_1000 = new Achievement("1000 Clicks", "clicks_1000", "You clicked 1000 buttons. Really?!", "6")
    var firstUpgrade = new Achievement("Unlock An Upgrade", "firstUpgrade", "firstUpgrade", "7")
    var maxUpgrade = new Achievement("Unlock All Upgrades", "maxUpgrade", "maxUpgrade", "8")
    var unlockElectron = new Achievement("Unlock Electron", "unlockElectron", "unlockElectron", "9")
    var unlockDarkMatter = new Achievement("Unlock Dark Matter", "unlockDarkMatter", "unlockDarkMatter", "10")
    var completeFire = new Achievement("Complete Fire", "completeFire", "first upgrade", "11")
    var completeWater = new Achievement("Complete Water", "completeWater", "first upgrade", "12")
    var completeWind = new Achievement("Complete Wind", "completeWind", "first upgrade", "13")
    var completeEarth = new Achievement("Complete Earth", "completeEarth", "first upgrade", "14")
    var completeElectron = new Achievement("Complete Electron", "completeElectron", "first upgrade", "15")
    var completeNucleus = new Achievement("Complete Nucleus", "completeNucleus", "first upgrade", "16")
    var completeGravity = new Achievement("Complete Gravity", "completeGravity", "first upgrade", "17")
    var completeDarkMatter = new Achievement("Complete Dark Matter", "completeDarkMatter", "first upgrade", "18")
    var completeAll = new Achievement("Complete All Elements", "completeAll", "first upgrade", "19")
    var changeTheme = new Achievement("Change Theme", "changeTheme", "first upgrade", "20")
    var tryAllThemes = new Achievement("Try All Themes", "tryAllThemes", "first upgrade", "21")
    var clickDeveloper = new Achievement("Check Out Developer", "clickDeveloper", "first upgrade", "22")
    var secret1 = new Achievement("Secret 1", "secret1", "first upgrade", "23")
    var secret2 = new Achievement("Secret 2", "secret2", "first upgrade", "24")
    let achievements = [
        firstClick, clicks_50, clicks_100, clicks_250, clicks_500, clicks_1000, firstUpgrade,
        maxUpgrade, unlockElectron, unlockDarkMatter, completeFire, completeWater, completeWind, completeEarth,
        completeElectron, completeNucleus, completeGravity, completeDarkMatter, changeTheme, clickDeveloper,
        tryAllThemes, completeAll, secret1, secret2
    ]

    let unlockLevel = [1, 2, 50, 100, 200, 500, 1000, 2000]
    var currentRank = 0
    var unlocked = []
    var achievementUnlocked = []
    var totalScore = 0
    var totalClicks = 0
    var firstUpgradeUnlocked = false
    var changeTheme = false
    var clickDeveloper = false
    var themeCount = 0
    var currentTheme = 'defaultTheme'
    var maxCount = 0
    var upgradeCount = 0

    for (i = 0; i < NUM_ELEMENTS; i++) unlocked[i] = false
    for (i = 0; i < NUM_ACHIEVEMENTS; i++) achievementUnlocked[i] = false

    // FUNCTIONS

    debug = () => {
        // for (i = 0; i < NUM_ELEMENTS; i++) {
        //     unlocked[i] = true
        //     clickers[i].unlockTheme()
        // }
        // maxCount = 8
        // checkAchievement()

        for (i = 0; i < NUM_ACHIEVEMENTS; i++) {
            achievements[i].unlocked = true
            processAchievement(achievements[i])
        }

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

    processAchievement = (achievement) => {
        $("." + achievement.id).parent().removeClass("d-none")
        var ach = "#" + achievement.id
        $(ach).find(".achievementImage").html(achievement.img)
        $(ach).find(".achievementName").text(achievement.name)
        $(ach).find(".achievementText").text(achievement.text)
        console.log("Achievement unlocked! " + achievement.name + ": " + achievement.text)
    }

    checkAchievement = () => {
        // First Click
        if (!firstClick.unlocked && (totalClicks >= 1)) {
            firstClick.unlocked = true
            processAchievement(firstClick)
        }
        // 50 Clicks
        if (!clicks_50.unlocked && (totalClicks >= 50)) {
            clicks_50.unlocked = true
            processAchievement(clicks_50)
        }
        // 100 Clicks
        if (!clicks_100.unlocked && (totalClicks >= 100)) {
            clicks_100.unlocked = true
            processAchievement(clicks_100)
        }
        // 250 Clicks
        if (!clicks_250.unlocked && (totalClicks >= 250)) {
            clicks_250.unlocked = true
            processAchievement(clicks_250)
        }
        // 500 Clicks
        if (!clicks_500.unlocked && (totalClicks >= 500)) {
            clicks_500.unlocked = true
            processAchievement(clicks_500)
        }
        // 1000 Clicks
        if (!clicks_1000.unlocked && (totalClicks >= 1000)) {
            clicks_1000.unlocked = true
            processAchievement(clicks_1000)
        }
        // Unlock An Upgrade
        if (!firstUpgrade.unlocked && firstUpgradeUnlocked) {
            firstUpgrade.unlocked = true
            processAchievement(firstUpgrade)
        }
        // Unlock All Upgrades
        if (!maxUpgrade.unlocked && (upgradeCount == MAX_UPGRADES)) {
            maxUpgrade.unlocked = true
            processAchievement(maxUpgrade)
        }
        // Unlock Electron
        if (!unlockElectron.unlocked && (unlocked[4] == true)) {
            unlockElectron.unlocked = true
            processAchievement(unlockElectron)
        }
        // Unlock Dark Matter        
        if (!unlockDarkMatter.unlocked && (unlocked[7] == true)) {
            unlockDarkMatter.unlocked = true
            processAchievement(unlockDarkMatter)
        }
        // Complete Fire
        if (!completeFire.unlocked && (fire.currentLevel == MAX_LEVEL)) {
            completeFire.unlocked = true
            processAchievement(completeFire)
        }
        // Complete Water
        if (!completeWater.unlocked && (water.currentLevel == MAX_LEVEL)) {
            completeWater.unlocked = true
            processAchievement(completeWater)
        }
        // Complete Wind
        if (!completeWind.unlocked && (wind.currentLevel == MAX_LEVEL)) {
            completeWind.unlocked = true
            processAchievement(completeWind)
        }
        // Complete Earth
        if (!completeEarth.unlocked && (earth.currentLevel == MAX_LEVEL)) {
            completeEarth.unlocked = true
            processAchievement(completeEarth)
        }
        // Complete Electron
        if (!completeElectron.unlocked && (electron.currentLevel == MAX_LEVEL)) {
            completeElectron.unlocked = true
            processAchievement(completeElectron)
        }
        // Complete Nucleus
        if (!completeNucleus.unlocked && (nucleus.currentLevel == MAX_LEVEL)) {
            completeNucleus.unlocked = true
            processAchievement(completeNucleus)
        }
        // Complete Gravity
        if (!completeGravity.unlocked && (gravity.currentLevel == MAX_LEVEL)) {
            completeGravity.unlocked = true
            processAchievement(completeGravity)
        }
        // Complete Dark Matter
        if (!completeDarkMatter.unlocked && (darkMatter.currentLevel == MAX_LEVEL)) {
            completeDarkMatter.unlocked = true
            processAchievement(completeDarkMatter)
        }
        // Complete All Elements (unlocks Ultima theme)
        if (!completeAll.unlocked && (maxCount == NUM_ELEMENTS)) {
            completeAll.unlocked = true
            processAchievement(completeAll)
            $("#ultimaTheme").text("ultima")
            console.log("ULTIMA theme unlocked!")
        }
        // Change Theme
        if (!changeTheme.unlocked && (changeTheme == true)) {
            changeTheme.unlocked = true
            processAchievement(changeTheme)
        }
        // Try All Themes
        if (!tryAllThemes.unlocked && (themeCount == MAX_THEMES)) {
            tryAllThemes.unlocked = true
            processAchievement(tryAllThemes)
        }
        // Check Out Developer
        if (!clickDeveloper.unlocked && (clickDeveloper == true)) {
            clickDeveloper.unlocked = true
            processAchievement(clickDeveloper)
        }
        // if (!secret1.unlocked && ()) {
        //     secret1.unlocked = true
        // processAchievement(secret1)
        // }
        // if (!secret2.unlocked && ()) {
        //     secret2.unlocked = true
        // processAchievement(secret2)
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
            if (!changeTheme) changeTheme = true
            console.log("change theme to Ultima")
        } else {
            var selectedTheme = this.id.substring(0, (this.id.length - 5)) /* take element name from button id" */
            for (i = 0; i < NUM_ELEMENTS; i++) {
                if ((clickers[i].id == selectedTheme) && (this.id != currentTheme) && clickers[i].themeUnlocked) {
                    var selectTheme = window[this.id]; /* adapted from code @ "https://www.viralpatel.net/calling-javascript-function-from-string/" */
                    selectTheme();
                    if (!changeTheme) changeTheme = true
                    console.log("change theme to " + selectedTheme)
                }
            }
        }
        checkAchievement()
    })

    // ACHIEVEMENTS
    $(".achievementButton").click(function () {
        console.log("achievement button clicked")

        // create div above button
        // fill div with achievementName and achievementText

    })

    // JQUERY STYLE + CONTENT
    $("body").addClass("defaultTheme")
    $(".gameTitle").text(GAME_TITLE)
    $(".email").text(CONTACT_EMAIL)

    debug()
})