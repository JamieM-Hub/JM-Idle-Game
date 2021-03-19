$(document).ready(function () {

    // CONSTANTS

    const PROJECT_NAME = "JM-Idle-Game"
    const GAME_TITLE = "ELEMENTS"
    const CONTACT_EMAIL = "jamiemckenzie7231@yahoo.co.uk"
    const NUM_ELEMENTS = 8
    const NUM_ACHIEVEMENTS = 24
    const MAX_LEVEL = 10
    const MAX_THEMES = 10
    const MAX_UPGRADES = (NUM_ELEMENTS * 3) /* elements x upgrades */
    const UPGRADE_MULTIPLIERS = [1, 2, 3, 5]
    const fireLevels = [1, 10, 20, 50, 75, 150, 250, 500, 750, 1000]
    const waterLevels = [2, 25, 50, 100, 150, 300, 420, 1000, 1500, 2000]
    const windLevels = [4, 60, 100, 300, 600, 1000, 1500, 5000, 7500, 10000]
    const earthLevels = [8, 120, 200, 500, 1500, 2500, 4000, 10000, 15000, 20000]
    const electronLevels = [16, 240, 400, 1200, 2500, 5000, 8000, 20000, 30000, 40000]
    const nucleusLevels = [32, 500, 1000, 2500, 5000, 10000, 15000, 40000, 60000, 80000]
    const gravityLevels = [64, 1000, 2000, 5000, 10000, 20000, 30000, 80000, 120000, 200000]
    const darkMatterLevels = [128, 2000, 4000, 10000, 20000, 40000, 60000, 150000, 250000, 500000]
    const playerLevels = [1, 100, 400, 1000, 2500, 8000, 25000, 50000]

    // ELEMENT OBJECTS

    function Clicker(id, color, unlockedAtLevel, clickLevels, iStart, theme, icon) {
        this.id = id
        this.color = color
        this.unlockedAtLevel = unlockedAtLevel
        this.count = 0
        this.count_T = 0
        this.unlocked = false
        this.currentLevel = 0
        this.clickLevels = clickLevels
        this.nextLevel = this.clickLevels[this.currentLevel]
        this.i = iStart
        this.theme = theme
        this.themeUnlocked = false
        this.icon = icon

        // contains full processing for when an element levels up
        this.levelUp = () => {
            this.currentLevel++;
            this.count -= this.nextLevel
            this.nextLevel = this.clickLevels[this.currentLevel]
            $("." + this.id).find(".trackerLevel").text(this.currentLevel)
            $("." + this.id).find(".trackerCount").text(this.count)

            // update display and system dependant on level
            if (this.currentLevel != MAX_LEVEL) {
                $("." + this.id).find(".clickerCount").text(this.count)
                $("." + this.id).find(".nextLevel").text(abbreviateNumber(this.nextLevel))
            }
            if (this.currentLevel == 1) {
                $(".tracker." + id).removeClass("d-none")
                $(".row > ." + id).parent().parent().removeClass("d-none")
                $("." + this.id + " > .clickerLevel").removeClass("d-none")
                $("." + this.id + " > .clickerCountDisplay").removeClass("d-none")
                $("." + this.id + " > .clickerLevel").text("Level 1")
                $("." + this.id + " > .clickerCountDisplay").text("UNLOCK!")
            }
            if ((this.currentLevel > 1) && (this.currentLevel < MAX_LEVEL)) {
                $("." + this.id + " > .clickerLevel").text("Level " + this.currentLevel)
                if (this.currentLevel == 3) this.i = unlockUpgrade(1, this.i, this)
                if (this.currentLevel == 5) this.i = unlockUpgrade(2, this.i, this)
                if (this.currentLevel == 7) this.i = unlockUpgrade(3, this.i, this)
                $("." + this.id + " > .clickerCountDisplay").text("LEVEL UP!")
            }
            if (this.currentLevel == MAX_LEVEL) {
                this.unlockTheme(this.theme)
                $("#" + this.id + " > .clickerLevel").text("Level MAX")
                $("." + this.id + " > .clickerCountDisplay").text("COMPLETE!")
                $("." + this.id).find(".trackerCountDisplay").text("COMPLETE!")
                $("." + this.id).find(".upgradeMultiplier").html("<i class=\"fas fa-crown\"></i>")
                $("." + this.id).find(".upgradeMultiplier > i").addClass(player.currentTheme).addClass("no-shadow")
                $("." + this.id).find(".upgradeMultiplier > i").css("background-color", "transparent")
            }

            // update increment displayed in tracker
            $("." + this.id).find(".trackerIncrement").text("+" + abbreviateNumber(this.i))
        }

        // runs when an element reaches level 10 and processes theme unlock
        this.unlockTheme = (theme) => {
            player.maxCount++
            if (player.maxCount == 1) {
                $("#defaultTheme > i").removeClass("fas fa-question").addClass("far fa-hand-pointer")
                $("#themesMenuButton").css("visibility", "visible")
            }
            if (!this.themeUnlocked) this.themeUnlocked = true
            $("#" + this.theme).removeClass("defaultTheme").addClass(this.theme)
            $("#" + this.theme + " > i").removeClass("fas fa-question").addClass(this.icon)
        }
    }

    var fire = new Clicker("fire", "red", playerLevels[0], fireLevels, 1, "fireTheme", "fab fa-gripfire")
    var water = new Clicker("water", "blue", playerLevels[1], waterLevels, 2, "waterTheme", "fas fa-tint")
    var wind = new Clicker("wind", "lightgray", playerLevels[2], windLevels, 4, "windTheme", "fas fa-wind")
    var earth = new Clicker("earth", "brown", playerLevels[3], earthLevels, 8, "earthTheme", "fas fa-globe-americas")
    var electron = new Clicker("electron", "yellow", playerLevels[4], electronLevels, 16, "electronTheme", "fas fa-bolt")
    var nucleus = new Clicker("nucleus", "green", playerLevels[5], nucleusLevels, 32, "nucleusTheme", "fas fa-atom")
    var gravity = new Clicker("gravity", "black", playerLevels[6], gravityLevels, 64, "gravityTheme", "fas fa-meteor")
    var darkMatter = new Clicker("darkMatter", "purple", playerLevels[7], darkMatterLevels, 128, "darkMatterTheme", "fas fa-cubes")
    let clickers = [fire, water, wind, earth, electron, nucleus, gravity, darkMatter]

    // ACHIEVEMENT OBJECTS

    function Achievement(name, id, text, icon, qName) {
        this.name = name
        this.id = id
        this.text = text
        this.icon = icon
        this.qName = qName
        this.unlocked = false
    }

    var unlockFire = new Achievement("Unlock Fire", "unlockFire", "Dinner time", "fab fa-gripfire", "????? ?????")
    var unlockElectron = new Achievement("Unlock Electron", "unlockElectron", "Put the kettle on", "fas fa-bolt", "?????? ????????")
    var unlockDarkMatter = new Achievement("Unlock Dark Matter", "unlockDarkMatter", "Einstein smiles down on you", "fas fa-cubes", "??????? ???? ??????")
    var clicks_50 = new Achievement("50 Clicks", "clicks_50", "Impressive!", "far fa-hand-pointer", "?? ??????")
    var clicks_100 = new Achievement("100 Clicks", "clicks_100", "Superb!", "far fa-hand-pointer", "??? ??????")
    var clicks_250 = new Achievement("250 Clicks", "clicks_250", "Prodigous!", "far fa-hand-pointer", "??? ??????")
    var clicks_500 = new Achievement("500 Clicks", "clicks_500", "Godlike!", "far fa-hand-pointer", "??? ??????")
    var clicks_1000 = new Achievement("1000 Clicks", "clicks_1000", "Really?!", "far fa-hand-pointer", "???? ??????")
    var firstUpgrade = new Achievement("Unlock An Upgrade", "firstUpgrade", "Same click, more stuff", "fas fa-angle-double-up", "????? ???????")
    var maxUpgrade = new Achievement("Unlock All Upgrades", "maxUpgrade", "MAXIMUM POWER", "fas fa-angle-double-up", "??? ???????")
    var completeFire = new Achievement("Complete Fire", "completeFire", "Toasty", "fab fa-gripfire", "???????? ????")
    var completeWater = new Achievement("Complete Water", "completeWater", "Glub glub glub", "fas fa-tint", "???????? ?????")
    var completeWind = new Achievement("Complete Wind", "completeWind", "I'm blown away", "fas fa-wind", "???????? ????")
    var completeEarth = new Achievement("Complete Earth", "completeEarth", "Moon coming in the sequel", "fas fa-globe-americas", "???????? ?????")
    var completeElectron = new Achievement("Complete Electron", "completeElectron", "Shocking", "fas fa-bolt", "???????? ????????")
    var completeNucleus = new Achievement("Complete Nucleus", "completeNucleus", "Great power = great responsibility", "fas fa-atom", "???????? ???????")
    var completeGravity = new Achievement("Complete Gravity", "completeGravity", "It's all downhill from here", "fas fa-meteor", "???????? ???????")
    var completeDarkMatter = new Achievement("Complete Dark Matter", "completeDarkMatter", "I would let the scientists know", "fas fa-cubes", "???????? ???? ??????")
    var completeAll = new Achievement("Complete All Elements", "completeAll", "What a ride! Isn't this fun?", "fas fa-crown", "???????? ???")
    var changeTheme = new Achievement("Change Theme", "changeTheme", "So pretty", "fas fa-paint-brush", "?????? ?????")
    var tryAllThemes = new Achievement("Try All Themes", "tryAllThemes", "That's it, no more fun. Go to bed.", "fas fa-palette", "??? ??? ??????")
    var clickDeveloper = new Achievement("Check Out Developer", "clickDeveloper", "I'm glad somebody cares", "fas fa-layer-group", "????? ?????????")
    var devil = new Achievement("Secret 1: Devil's Game", "devil", "You almost scored 666. Find Jesus.", "fas fa-question-circle", "?????? ?: ?????? ????")
    var messiah = new Achievement("Secret 2: The Messiah", "messiah", "Jesus! Someone's looking for you.", "fas fa-question-circle", "?????? ?: ??? ???????")
    let achievements = [
        unlockFire, clicks_50, clicks_100, clicks_250, clicks_500, clicks_1000, firstUpgrade,
        maxUpgrade, unlockElectron, unlockDarkMatter, completeFire, completeWater, completeWind, completeEarth,
        completeElectron, completeNucleus, completeGravity, completeDarkMatter, changeTheme, clickDeveloper,
        tryAllThemes, completeAll, devil, messiah
    ]

    // PLAYER OBJECT
    function Player() {
        this.name = ""
        this.level = 0
        this.score = 0
        this.clicks = 0
        this.newGame = false
        this.firstUpgradeUnlocked = false
        this.themeChanged = false
        this.themesTried = []
        this.developerClicked = false
        this.currentTheme = "defaultTheme"
        this.upgradeCount = 0
        this.maxCount = 0
        this.gameStarted = false
    }

    var player = new Player()
    player.themesTried[0] = true
    for (i = 1; i < MAX_THEMES; i++) player.themesTried[i] = false

    // FUNCTIONS

    // unlocks all clickers, achievements and themes
    debug = () => {
        for (i = 0; i < NUM_ELEMENTS; i++) {
            clickers[i].unlocked = true
            clickers[i].unlockTheme()
            $(".clicker." + clickers[i].id).parent().removeClass("d-none")
        }
        for (i = 0; i < NUM_ACHIEVEMENTS; i++) processAchievement(achievements[i])
        checkAchievement()
    }

    // unlocks all clickers and sets upgrade clicks for all clickers to 1
    debug2 = () => {
        for (i = 0; i < NUM_ELEMENTS; i++) clickers[i].clickLevels = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        for (i = 0; i < NUM_ELEMENTS; i++) {
            clickers[i].unlocked = true
            $(".clicker." + clickers[i].id).parent().removeClass("d-none")
        }
    }

    // starts new game by initialising data and resetting game board
    reset = (newPlayer) => {
        if (player.currentTheme != "defaultTheme") changeToSelectedTheme("defaultTheme")
        player = new Player()

        // totals
        $(".playerName").text(newPlayer)
        $(".totalClicks").text("")
        $(".totalScore").text("")
        $(".levelLevel").text("0")

        // element objects
        fire = new Clicker("fire", "red", playerLevels[0], fireLevels, 1, "fireTheme", "fab fa-gripfire")
        water = new Clicker("water", "blue", playerLevels[1], waterLevels, 2, "waterTheme", "fas fa-tint")
        wind = new Clicker("wind", "lightgray", playerLevels[2], windLevels, 4, "windTheme", "fas fa-wind")
        earth = new Clicker("earth", "brown", playerLevels[3], earthLevels, 8, "earthTheme", "fas fa-globe-americas")
        electron = new Clicker("electron", "yellow", playerLevels[4], electronLevels, 16, "electronTheme", "fas fa-bolt")
        nucleus = new Clicker("nucleus", "green", playerLevels[5], nucleusLevels, 32, "nucleusTheme", "fas fa-atom")
        gravity = new Clicker("gravity", "black", playerLevels[6], gravityLevels, 64, "gravityTheme", "fas fa-meteor")
        darkMatter = new Clicker("darkMatter", "purple", playerLevels[7], darkMatter, 128, "darkMatterTheme", "fas fa-cubes")
        clickers = [fire, water, wind, earth, electron, nucleus, gravity, darkMatter]

        // trackers
        $(".tracker").addClass("d-none")
        $(".trackerLevel").text("1")
        $(".trackerIncrement").text("1")
        $(".trackerTotal").text("-")
        $(".trackerCount").text("-")
        $(".nextLevel").text("-")
        $("#themesMenuButton").css("visibility", "hidden")
        $(".clickerLevel").addClass("d-none")
        $(".clickerCountDisplay").addClass("d-none")
        $(".upgradeMultiplier").text("")

        // themes
        for (i = 0; i < MAX_THEMES; i++) player.themesTried[i] = false

        // element clickers
        for (i = 0; i < NUM_ELEMENTS; i++) {
            clickers[i].count = 0
            clickers[i].count_T = 0
            clickers[i].currentLevel = 0
            clickers[i].unlocked = false
            clickers[i].themeUnlocked = false
            $(".themeButton." + clickers[i].theme).removeClass(clickers[i].theme).addClass("defaultTheme")
            $(".clicker." + clickers[i].id).parent().addClass("d-none")
            $(".tracker." + clickers[i].id).parent().addClass("d-none")
        }

        // keep first Element visible
        $(".clicker.fire").parent().removeClass("d-none")
        $(".clicker.fire").find(".clickerLevel").addClass("d-none")
        $(".clicker.fire").find(".clickerCountDisplay").addClass("d-none")

        // achievements
        for (i = 0; i < NUM_ACHIEVEMENTS; i++) {
            achievements[i].unlocked = false
            $("." + achievements[i].id).parent().addClass("d-none")
            var ach = "#" + achievements[i].id
            $(ach).find(".achievementImage").text("?")
            $(ach).find(".achievementName").text(achievements[i].qName)
            $(ach).find(".achievementText").text("???")
        }
    }

    // updates current count data and display
    incrementCount = (count, i, nextLevel, clicker) => {
        count += i
        let text = abbreviateNumber(count)
        $("." + clicker.id + " > .clickerCountDisplay").text(text + " / " + abbreviateNumber(nextLevel))
        $("." + clicker.id).find(".trackerCount").text(text)
        $("." + clicker.id + " > .clickerLevel").text("Level " + clicker.currentLevel)
        return count
    }

    // updates total count data and display
    incrementCount_T = (count_T, i, id) => {
        count_T += i
        $("." + id).find(".trackerTotal").text(abbreviateNumber(count_T))
        return count_T
    }

    // updates total clicks data and display
    incrementClicks = (clicks) => {
        clicks++
        $(".totalClicks").text(abbreviateNumber(clicks))
        return clicks
    }

    // updates total score data and display
    incrementScore = (score, i) => {
        score += i
        // Scoring 666 for achievement not possible due to only odd numbers (see README)
        if ((score >= 665) && (score <= 667)) {
            devil.unlocked = true
            processAchievement(devil)
        }
        $(".totalScore").text(abbreviateNumber(score))
        return score
    }

    // takes number, modifies decimal point and adds k M or B depending on size of number
    // toFixed() taken from https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding
    abbreviateNumber = (number) => {
        let text = number.toString()

        if (number >= 1000 && number < 1000000) {
            number /= 1000
            if (number >= 100) number = number.toFixed(0)
            if (number < 100 && number >= 10) number = number.toFixed(1)
            if (number < 10) number = number.toFixed(2)
            text = number.toString() + "k"
        }
        if (number >= 1000000 && number < 1000000000) {
            number /= 1000000
            if (number >= 100) number = number.toFixed(0)
            if (number < 100 && number >= 10) number = number.toFixed(1)
            if (number < 10) number = number.toFixed(2)
            text = number.toString() + "M"
        }
        if (number >= 1000000000 && number < 1000000000000) {
            number /= 1000000000
            if (number >= 100) number = number.toFixed(0)
            if (number < 100 && number >= 10) number = number.toFixed(1)
            if (number < 10) number = number.toFixed(2)
            text = number.toString() + "B"
        }
        return text
    }

    // add multiplier to count and display multiplier
    unlockUpgrade = (n, i, clicker) => {
        if (!player.firstUpgradeUnlocked && (level = 1)) player.firstUpgradeUnlocked = true
        player.upgradeCount++;
        i *= UPGRADE_MULTIPLIERS[n]
        if (n == 1) {
            $(".clicker." + clicker.id).find(".upgradeMultiplier").css("visibility", "visible")
        }
        $("." + clicker.id + " > .clickerLevel").text("UPGRADE!")
        $("." + clicker.id).find(".upgradeMultiplier").text("x" + UPGRADE_MULTIPLIERS[n])
        return i
    }

    // level up if next level has been reached
    checkLevel = (clicker) => {
        if (clicker.count >= clicker.nextLevel) {
            clicker.levelUp()
        }
    }

    // unlock element clicker if next player level has been reached
    checkUnlock = (score) => {
        for (i = 0; i < NUM_ELEMENTS; i++) {
            if ((score >= clickers[i].unlockedAtLevel) && !clickers[i].unlocked) {
                clickers[i].unlocked = true;
                $(".clicker." + clickers[i].id).parent().removeClass("d-none")
                player.level++
                $(".levelLevel").text(player.level)
            }
        }
    }

    // takes achievement name and updates object and display
    processAchievement = (achievement) => {
        achievement.unlocked = true
        $("." + achievement.id).parent().removeClass("d-none")
        var ach = "#" + achievement.id
        $(ach).find(".achievementImage").html("<i class=\"" + achievement.icon + "\"></i>")
        $(ach).find(".achievementName").text(achievement.name)
        $(ach).find(".achievementText").text(achievement.text)
    }

    // if achievement is locked and the win condition has been met, process achievement
    checkAchievement = () => {
        if (!unlockFire.unlocked && (player.clicks >= 1)) {
            processAchievement(unlockFire);
            $("#trackers.d-none").removeClass("d-none")
        }
        if (!unlockElectron.unlocked && (clickers[4].unlocked == true)) processAchievement(unlockElectron)
        if (!unlockDarkMatter.unlocked && (clickers[7].unlocked == true)) processAchievement(unlockDarkMatter)
        if (!clicks_50.unlocked && (player.clicks >= 50)) processAchievement(clicks_50)
        if (!clicks_100.unlocked && (player.clicks >= 100)) processAchievement(clicks_100)
        if (!clicks_250.unlocked && (player.clicks >= 250)) processAchievement(clicks_250)
        if (!clicks_500.unlocked && (player.clicks >= 500)) processAchievement(clicks_500)
        if (!clicks_1000.unlocked && (player.clicks >= 1000)) processAchievement(clicks_1000)
        if (!firstUpgrade.unlocked && player.firstUpgradeUnlocked) processAchievement(firstUpgrade)
        if (!maxUpgrade.unlocked && (player.upgradeCount == MAX_UPGRADES)) processAchievement(maxUpgrade)
        if (!completeFire.unlocked && (fire.currentLevel == MAX_LEVEL)) processAchievement(completeFire)
        if (!completeWater.unlocked && (water.currentLevel == MAX_LEVEL)) processAchievement(completeWater)
        if (!completeWind.unlocked && (wind.currentLevel == MAX_LEVEL)) processAchievement(completeWind)
        if (!completeEarth.unlocked && (earth.currentLevel == MAX_LEVEL)) processAchievement(completeEarth)
        if (!completeElectron.unlocked && (electron.currentLevel == MAX_LEVEL)) processAchievement(completeElectron)
        if (!completeNucleus.unlocked && (nucleus.currentLevel == MAX_LEVEL)) processAchievement(completeNucleus)
        if (!completeGravity.unlocked && (gravity.currentLevel == MAX_LEVEL)) processAchievement(completeGravity)
        if (!completeDarkMatter.unlocked && (darkMatter.currentLevel == MAX_LEVEL)) processAchievement(completeDarkMatter)
        if (!changeTheme.unlocked && (player.themeChanged == true)) {
            changeTheme.unlocked = true;
            processAchievement(changeTheme)
        }
        if (!clickDeveloper.unlocked && (player.developerClicked == true)) {
            clickDeveloper.unlocked = true;
            processAchievement(clickDeveloper)
        }
        if (!completeAll.unlocked && (player.maxCount == NUM_ELEMENTS)) {
            processAchievement(completeAll)
            $("#ultimaTheme > i").removeClass("fas fa-question").addClass("fas fa-crown")
            $("#ultimaTheme").removeClass("defaultTheme").addClass("ultimaTheme")
        }
        var _themesTried = 0
        for (i = 0; i < MAX_THEMES; i++)
            if (player.themesTried[i] == true) _themesTried++
        if (!tryAllThemes.unlocked && (_themesTried == MAX_THEMES)) {
            tryAllThemes.unlocked = true;
            processAchievement(tryAllThemes)
        }
    }

    // take clicked button and return its name
    detectClicker = (btn, clickers) => {
        var clickedClicker

        for (let i = 0; i < 8; i++) {
            if (clickers[i].id === btn.id) {
                clickedClicker = clickers[i]
            }
        }
        return clickedClicker
    }

    // update all relevant data and display depending on button clicked
    processClick = (clicker) => {
        player.clicks = incrementClicks(player.clicks)
        clicker.count = incrementCount(clicker.count, clicker.i, clicker.nextLevel, clicker)
        clicker.count_T = incrementCount_T(clicker.count_T, clicker.i, clicker.id)
        player.score = incrementScore(player.score, clicker.i)
        checkLevel(clicker)
        checkUnlock(player.score, clicker)
        checkAchievement()
    }

    // validate user input, set as player name, close start screen and show game board
    // user input method taken from https://www.w3docs.com/snippets/javascript/how-to-get-the-value-of-text-input-field-using-javascript.html
    startGame = () => {
        var playerName = document.getElementById("inputId").value

        if ((playerName.length > 0) && (playerName.length < 9)) {
            player.name = playerName
            $(".startMenu").addClass("d-none")
            $(".gameBoard").removeClass("d-none")
            $(".playerName").text(player.name)
            $("body").css("background-image", "url(\"../" + PROJECT_NAME + "/assets/img/defaultTheme.jpg\")")
            if ((player.name == "Jesus") || (player.name == "jesus")) {
                messiah.unlocked = true
                processAchievement(messiah)
            }
        } else if (playerName.length >= 9) {
            $("#inputId").text("").attr("placeholder", "Max 8 characters!")
        } else {
            $("#inputId").attr("placeholder", "Please enter your name!")
        }
    }

    // validate user input, set as player name, reset game board
    // modal toggle taken from https://stackoverflow.com/questions/16493280/close-bootstrap-modal
    newGame = () => {
        var playerName = document.getElementById("inputId2").value

        if ((playerName.length > 0) && (playerName.length < 9)) {
            reset(playerName)
            $('#newGame').modal('toggle')
            $("#toggleMenu.show").removeClass("show")
            if ((playerName == "Jesus") || (playerName == "jesus")) { messiah.unlocked = true; processAchievement(messiah) }
        } 
        else if (playerName.length >= 9) $("#inputId2").text("").attr("placeholder", "Max 8 characters!")
        else $("#inputId2").attr("placeholder", "Please enter your name!")
    }

    // BUTTONS

    // hide other menu if currently shown when theme or menu button clicked
    $(".navbar-toggler").click(function () {
        if ((this.id) == "themesMenuButton") $("#toggleMenu.show").removeClass("show")
        if ((this.id) == "toggleMenuButton") $("#themesMenu.show").removeClass("show")
    })

    // process data and display when element clicked
    $(".clicker").click(function () {
        var clickedClicker = detectClicker(this, clickers)
        if (clickedClicker.currentLevel < MAX_LEVEL) processClick(clickedClicker)
    })

    // show achievement modal when achievement button clicked
    $(".achievementButton").click(function () { $("#achievements").modal('toggle') })

    // show developer modal when achievement button clicked and unlock achievement
    $("#developerButton").click(function () {
        if (!player.developerClicked) {
            player.developerClicked = true
            checkAchievement()
        }
    })

    // THEMES

    // adds and removes given classes
    addRemoveClass = (target, class1, class2) => {
        $(target).toggleClass(class1)
        $(target).toggleClass(class2)
    }

    // update main menu button when theme changed
    changeThemeIcon = (from, to) => {
        var oldIcon, newIcon

        if (from == "defaultTheme") oldIcon = "far fa-hand-pointer"
        if (from == "ultimaTheme") oldIcon = "fas fa-crown"
        if (to == "defaultTheme") newIcon = "far fa-hand-pointer"
        if (to == "ultimaTheme") newIcon = "fas fa-crown"

        for (i = 0; i < NUM_ELEMENTS; i++) {
            if (from == clickers[i].theme) oldIcon = clickers[i].icon
            if (to == clickers[i].theme) newIcon = clickers[i].icon
        }
        addRemoveClass("#themeIcon", oldIcon, newIcon)
    }

    // updates all relevant display elements when theme changed and updates relevant data
    changeToSelectedTheme = (selectedTheme) => {
        var selected
        var imgSource = "url(\"../" + PROJECT_NAME + "/assets/img/" + selectedTheme + ".jpg\")"

        /* update display */
        $("body").css("background-image", imgSource)
        $(".modal-dialog").css("background-image", imgSource)
        addRemoveClass("body", player.currentTheme, selectedTheme)
        addRemoveClass(".navbar-toggler > span > i", player.currentTheme, selectedTheme)
        $(".navbar-toggler > span > i").css("background-color", "transparent")
        changeThemeIcon(player.currentTheme, selectedTheme)
        addRemoveClass(".modal-dialog", player.currentTheme, selectedTheme)
        addRemoveClass(".gameTitle", player.currentTheme, selectedTheme)
        $(".gameTitle").css("background-color", "transparent")
        addRemoveClass("#totals", player.currentTheme, selectedTheme)
        addRemoveClass("#trackers", player.currentTheme, selectedTheme)
        addRemoveClass(".clicker", player.currentTheme, selectedTheme)
        addRemoveClass(".upgradeIcon > i", player.currentTheme, selectedTheme)
        addRemoveClass(".upgradeMultiplier", player.currentTheme, selectedTheme)
        addRemoveClass(".upgradeMultiplier > i", player.currentTheme, selectedTheme)
        $(".upgradeIcon > i").css("background-color", "transparent")
        $(".upgradeMultiplier > i").css("background-color", "transparent")
        addRemoveClass(".achievementButton", player.currentTheme, selectedTheme)
        addRemoveClass(".menuButton", player.currentTheme, selectedTheme)
        $(".navbar-toggler").css("background-color", "transparent")
        addRemoveClass(".modal-content", player.currentTheme, selectedTheme)
        addRemoveClass(".nameButton", player.currentTheme, selectedTheme)
        addRemoveClass(".achievementButton > i", player.currentTheme, selectedTheme)
        addRemoveClass(".fa-play", player.currentTheme, selectedTheme)

        /* check & update themesTried */
        if (selectedTheme == "defaultTheme") {
            if (player.themesTried[0] == false)
                player.themesTried[0] = true
        } 
        else if (selectedTheme == "ultimaTheme") {
            if (player.themesTried[MAX_THEMES - 1] == false) player.themesTried[MAX_THEMES - 1] = true
        } 
        else {
            for (i = 0; i < NUM_ELEMENTS; i++) {
                if (clickers[i].theme == selectedTheme)
                    selected = i + 1
            }
            if (player.themesTried[selected] == false)
                player.themesTried[selected] = true
        }

        /* update system */
        player.currentTheme = selectedTheme
        if (!player.themeChanged && !(selectedTheme == "defaultTheme")) player.themeChanged = true
        checkAchievement()
    }

    // change theme when theme button clicked
    $(".themeButton").click(function () {
        if ((this.id == "defaultTheme") && (player.maxCount > 0)) changeToSelectedTheme(this.id)
        else if ((this.id == "ultimaTheme") && (completeAll.unlocked == true)) changeToSelectedTheme(this.id)
        else {
            for (i = 0; i < NUM_ELEMENTS; i++) {
                if ((clickers[i].theme == this.id) && (clickers[i].themeUnlocked)) changeToSelectedTheme(this.id)
                }
            }
        checkAchievement()
    })

    // add text from constants
    $(".gameTitle").text(GAME_TITLE)
    $(".email").text(CONTACT_EMAIL)
    $(".playerName").text(player.name)

    // add theme to relevant display elements
    $(".gameTitle").addClass("defaultTheme")
    $(".nameButton").addClass("defaultTheme")
    $(".menuButton").addClass("defaultTheme")
    $(".themeButton").addClass("defaultTheme")
    $("#totals").addClass("defaultTheme")
    $(".clicker").addClass("defaultTheme")
    $(".upgradeIcon > i").addClass("defaultTheme")
    $(".upgradeMultiplier").addClass("defaultTheme")
    $("#trackers").addClass("defaultTheme")
    $(".modal-content").addClass("defaultTheme")
    $(".achievementButton > i").addClass("defaultTheme")
    $(".achievementButton").addClass("defaultTheme")
})