$(document).ready(function () {

    // VARIABLES
    const GAME_TITLE = "IDLE Game"
    const CONTACT_EMAIL = "jamiemckenzie7231@yahoo.co.uk"
    const NUM_ELEMENTS = 8
    const NUM_ACHIEVEMENTS = 24
    const MAX_LEVEL = 10
    const MAX_THEMES = 9
    const MAX_UPGRADES = (NUM_ELEMENTS * 3) /* elements x upgrades */

    function Clicker(id, color, unlockedAtLevel, upgradeLevel, iStart, theme) {
        this.id = id
        this.color = color
        this.unlockedAtLevel = unlockedAtLevel
        this.count = 0
        this.count_T = 0
        this.unlocked = false
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
                $(".row > ." + id).next().find(".upgrade-4").removeClass("d-none")

            }
            //change increment displayed in tracker
            $(".row > ." + this.id).prev().text("+" + this.i)
        }
        this.unlockTheme = (theme) => {
            if (player.maxCount == 0) {
                $("#defaultTheme").text("default")
            }
            this.themeUnlocked = true
            player.maxCount++
            $("#" + this.theme).text(this.id)
            console.log(this.id + " theme unlocked!")
            // animateThemesButton(this.color)
        }
    }
    var fire = new Clicker("fire", "red", 1, [1, 10, 30, 50, 75, 250, 400, 1000, 1500, 2500], 1, "fireTheme")
    var water = new Clicker("water", "blue", 2, [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 2, "waterTheme")
    var wind = new Clicker("wind", "lightgray", 50, [4, 50, 80, 120, 1, 1, 1, 1, 1, 1], 4, "windTheme")
    var earth = new Clicker("earth", "brown", 100, [8, 75, 1000, 2000, 1, 1, 1, 1, 1, 1], 8, "earthTheme")
    var electron = new Clicker("electron", "yellow", 200, [16, 500, 1250, 2500, 1, 1, 1, 1, 1, 1], 16, "electronTheme")
    var nucleus = new Clicker("nucleus", "green", 500, [32, 750, 1500, 3000, 1, 1, 1, 1, 1, 1], 32, "nucleusTheme")
    var gravity = new Clicker("gravity", "black", 1000, [64, 1000, 2000, 3500, 1, 1, 1, 1, 1, 1], 64, "gravityTheme")
    var darkMatter = new Clicker("darkMatter", "purple", 2000, [128, 1250, 2500, 5000, 1, 1, 1, 1, 1, 1], 128, "darkMatterTheme")
    let clickers = [fire, water, wind, earth, electron, nucleus, gravity, darkMatter]

    function Achievement(name, id, text, icon) {
        this.name = name
        this.id = id
        this.text = id
        this.icon = icon
        this.unlocked = false
    }
    var unlockFire = new Achievement("Unlock Fire", "unlockFire", "You clicked a button. Wow!", "fab fa-gripfire")
    var unlockElectron = new Achievement("Unlock Electron", "unlockElectron", "unlockElectron", "fas fa-bolt")
    var unlockDarkMatter = new Achievement("Unlock Dark Matter", "unlockDarkMatter", "unlockDarkMatter", "fas fa-cubes")
    var clicks_50 = new Achievement("50 Clicks", "clicks_50", "You clicked 50 buttons. Impressive!", "far fa-hand-pointer")
    var clicks_100 = new Achievement("100 Clicks", "clicks_100", "You clicked 100 buttons. Superb!", "far fa-hand-pointer")
    var clicks_250 = new Achievement("250 Clicks", "clicks_250", "You clicked 250 buttons. Prodigous!", "far fa-hand-pointer")
    var clicks_500 = new Achievement("500 Clicks", "clicks_500", "You clicked 500 buttons. Godlike!", "far fa-hand-pointer")
    var clicks_1000 = new Achievement("1000 Clicks", "clicks_1000", "You clicked 1000 buttons. Really?!", "far fa-hand-pointer")
    var firstUpgrade = new Achievement("Unlock An Upgrade", "firstUpgrade", "firstUpgrade", "fas fa-angle-double-up")
    var maxUpgrade = new Achievement("Unlock All Upgrades", "maxUpgrade", "maxUpgrade", "fas fa-angle-double-up")
    var completeFire = new Achievement("Complete Fire", "completeFire", "first upgrade", "fab fa-gripfire")
    var completeWater = new Achievement("Complete Water", "completeWater", "first upgrade", "fas fa-tint")
    var completeWind = new Achievement("Complete Wind", "completeWind", "first upgrade", "fas fa-wind")
    var completeEarth = new Achievement("Complete Earth", "completeEarth", "first upgrade", "fas fa-globe-americas")
    var completeElectron = new Achievement("Complete Electron", "completeElectron", "first upgrade", "fas fa-bolt")
    var completeNucleus = new Achievement("Complete Nucleus", "completeNucleus", "first upgrade", "fas fa-atom")
    var completeGravity = new Achievement("Complete Gravity", "completeGravity", "first upgrade", "fas fa-meteor")
    var completeDarkMatter = new Achievement("Complete Dark Matter", "completeDarkMatter", "first upgrade", "fas fa-cubes")
    var completeAll = new Achievement("Complete All Elements", "completeAll", "first upgrade", "fas fa-crown")
    var changeTheme = new Achievement("Change Theme", "changeTheme", "first upgrade", "fas fa-paint-brush")
    var tryAllThemes = new Achievement("Try All Themes", "tryAllThemes", "first upgrade", "fas fa-palette")
    var clickDeveloper = new Achievement("Check Out Developer", "clickDeveloper", "first upgrade", "fas fa-layer-group")
    var secret1 = new Achievement("Secret 1", "secret1", "first upgrade", "fas fa-question-circle")
    var secret2 = new Achievement("Secret 2", "secret2", "first upgrade", "fas fa-question-circle")
    let achievements = [
        unlockFire, clicks_50, clicks_100, clicks_250, clicks_500, clicks_1000, firstUpgrade,
        maxUpgrade, unlockElectron, unlockDarkMatter, completeFire, completeWater, completeWind, completeEarth,
        completeElectron, completeNucleus, completeGravity, completeDarkMatter, changeTheme, clickDeveloper,
        tryAllThemes, completeAll, secret1, secret2
    ]

    function Player() {
        this.name = "Mr Click"
        this.rank = 0
        this.score = 0
        this.clicks = 0
        this.newGame = false
        this.firstUpgradeUnlocked = false
        this.themeChanged = false
        this.themesTried = [false]
        this.developerClicked = false
        this.themeCount = 0
        this.currentTheme = 'defaultTheme'
        this.upgradeCount = 0
        this.maxCount = 0
        this.gameStarted = false
    }
    var player = new Player()
    // var playerName = "Mr Click"

    // FUNCTIONS

    debug = () => {
        for (i = 0; i < NUM_ELEMENTS; i++) {
            clickers[i].unlocked = true
            clickers[i].unlockTheme()
        }
        player.maxCount = 8
        checkAchievement()
    }

    newGame = (name) => {

        player.gameStarted = true
        // player.name = name
        console.log(clickers)
        console.log(player)

        for (i = 0; i = NUM_ELEMENTS; i++) {
            clickers[i].count = 0
            clickers[i].count_T = 0
            clickers[i].unlocked = false
            clickers[i].currentLevel = 0
        }
        for (i = 0; i < NUM_ACHIEVEMENTS; i++) achievements[i].unlocked = false
        for (i = 0; i < MAX_THEMES; i++) player.themesTried[i] = false

        console.log(clickers)
        console.log(player)

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

    incrementScore = (score, i) => {
        score += i
        $(".totalScore").text(score.toString())
        return score
    }

    incrementClicks = (clicks) => {
        clicks++
        $(".totalClicks").text(clicks.toString())
        return clicks
    }

    changeIncrement = (id, i) => {
        $(".row > ." + id).prev().text("+" + i)
    }

    // roundtoDecimalPlace = (number, places) => {
    //     if (places >= 1) {
    //         var whole = number
    //         var int = Math.floor(whole)
    //         whole = whole - int /* leaves a decimal between 0-1 */
    //         whole = Math.round((whole) * (10 ^ (places))) / (10 ^ (places))
    //         console.log(whole, int)
    //         number = int + whole
    //         console.log(number)
    //     }
    //     return number
    // }

    unlockUpgrade = (n, i, id) => {
        if (!player.firstUpgradeUnlocked && (level = 1)) player.firstUpgradeUnlocked = true
        $(".row > ." + id).next().find(".upgrade-" + n).removeClass("d-none")
        player.upgradeCount++;
        if (n == 1) i *= 2
        if (n == 2) i *= 3
        if (n == 3) i *= 5
        return i
    }

    checkLevel = (clicker) => {
        if (clicker.count >= clicker.nextLevel) {
            clicker.levelUp()
        }
    }

    checkUnlock = (score) => {
        for (i = 0; i < NUM_ELEMENTS; i++) {
            if ((score >= clickers[i].unlockedAtLevel) && !clickers[i].unlocked) {
                clickers[i].unlocked = true;
                $(".clicker." + clickers[i].id).parent().removeClass("d-none")
                player.rank++
                $(".rankRank").text("Rank " + player.rank)
            }
        }
    }

    // checkRank = (player.score) => {
    //     if (player.score >= unlockLevel[player.rank]) {
    //         player.rank++
    //         $(".rankRank").text("Rank " + player.rank)
    //     }
    // }

    processAchievement = (achievement) => {
        $("." + achievement.id).parent().removeClass("d-none")
        var ach = "#" + achievement.id
        $(ach).find(".achievementImage").html("<i class=\"" + achievement.icon + "\"></i>")
        $(ach).find(".achievementName").text(achievement.name)
        $(ach).find(".achievementText").text(achievement.text)
        console.log("Achievement unlocked! " + achievement.name + ": " + achievement.text)
    }

    checkAchievement = () => {
        // Unlock Fire
        if (!unlockFire.unlocked && (player.clicks >= 1)) {
            unlockFire.unlocked = true
            processAchievement(unlockFire)
        }
        // Unlock Electron
        if (!unlockElectron.unlocked && (clickers[4].unlocked == true)) {
            unlockElectron.unlocked = true
            processAchievement(unlockElectron)
        }
        // Unlock Dark Matter        
        if (!unlockDarkMatter.unlocked && (clickers[7].unlocked == true)) {
            unlockDarkMatter.unlocked = true
            processAchievement(unlockDarkMatter)
        }
        // 50 Clicks
        if (!clicks_50.unlocked && (player.clicks >= 50)) {
            clicks_50.unlocked = true
            processAchievement(clicks_50)
        }
        // 100 Clicks
        if (!clicks_100.unlocked && (player.clicks >= 100)) {
            clicks_100.unlocked = true
            processAchievement(clicks_100)
        }
        // 250 Clicks
        if (!clicks_250.unlocked && (player.clicks >= 250)) {
            clicks_250.unlocked = true
            processAchievement(clicks_250)
        }
        // 500 Clicks
        if (!clicks_500.unlocked && (player.clicks >= 500)) {
            clicks_500.unlocked = true
            processAchievement(clicks_500)
        }
        // 1000 Clicks
        if (!clicks_1000.unlocked && (player.clicks >= 1000)) {
            clicks_1000.unlocked = true
            processAchievement(clicks_1000)
        }
        // Unlock An Upgrade
        if (!firstUpgrade.unlocked && player.firstUpgradeUnlocked) {
            firstUpgrade.unlocked = true
            processAchievement(firstUpgrade)
        }
        // Unlock All Upgrades
        if (!maxUpgrade.unlocked && (player.upgradeCount == MAX_UPGRADES)) {
            maxUpgrade.unlocked = true
            processAchievement(maxUpgrade)
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
        if (!completeAll.unlocked && (player.maxCount == NUM_ELEMENTS)) {
            completeAll.unlocked = true
            processAchievement(completeAll)
            $("#ultimaTheme").text("ultima")
            console.log("ULTIMA theme unlocked!")
        }
        // Change Theme
        if (!changeTheme.unlocked && (player.themeChanged == true)) {
            changeTheme.unlocked = true
            processAchievement(changeTheme)
        }
        // Try All Themes
        var _themesTried = 0
        for (i = 0; i < MAX_THEMES; i++) {
            if (player.themesTried[i] == true) _themesTried++
        }
        if (!tryAllThemes.unlocked && (_themesTried == MAX_THEMES)) {
            tryAllThemes.unlocked = true
            processAchievement(tryAllThemes)
        }
        // Check Out Developer
        if (!clickDeveloper.unlocked && (player.developerClicked == true)) {
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

    // animateThemesButton = (color) => {
    //     var button = $("#themesButton")
    //     button.css("background-color", color)
    // button.animate({height: '120%', width: '120%'}, "fast");
    // button.animate({height: '100%', width: '100%'}, 1000); 
    // }

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
        player.clicks = incrementClicks(player.clicks)
        clicker.count = incrementCount(clicker.count, clicker.i, clicker.nextLevel, clicker.id)
        clicker.count_T = incrementCount_T(clicker.count_T, clicker.i, clicker.id)
        player.score = incrementScore(player.score, clicker.i)
        checkLevel(clicker)
        //checkRank(player.score)
        checkUnlock(player.score, clicker)
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
        if (!player.developerClicked) {
            player.developerClicked = true
            checkAchievement()
        }
    })

    // NEW GAME BUTTON
    $("#newGameConfirmed").click(function () {
        newGame(playerName)
    })

    // THEMES
    defaultTheme = () => {
        if (player.currentTheme != "defaultTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("defaultTheme")
            $(".modal-content").addClass("defaultTheme")
            player.currentTheme = "defaultTheme"
        }
    }
    fireTheme = () => {
        if (player.themesTried[0] == false) {
            player.themesTried[0] = true
            checkAchievement()
        }
        if (player.currentTheme != "fireTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("fireTheme")
            $(".modal-content").addClass("fireTheme")
            player.currentTheme = "fireTheme"
        }
    }
    waterTheme = () => {
        if (player.themesTried[1] == false) {
            player.themesTried[1] = true
            checkAchievement()
        }
        if (player.currentTheme != "waterTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("waterTheme")
            $(".modal-content").addClass("waterTheme")
            player.currentTheme = "waterTheme"
        }
    }
    windTheme = () => {
        if (player.themesTried[2] == false) {
            player.themesTried[2] = true
            checkAchievement()
        }
        if (player.currentTheme != "windTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("windTheme")
            $(".modal-content").addClass("windTheme")
            player.currentTheme = "windTheme"
        }
    }
    earthTheme = () => {
        if (player.themesTried[3] == false) {
            player.themesTried[3] = true
            checkAchievement()
        }
        if (player.currentTheme != "earthTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("earthTheme")
            $(".modal-content").addClass("earthTheme")
            player.currentTheme = "earthTheme"
        }
    }
    electronTheme = () => {
        if (player.themesTried[4] == false) {
            player.themesTried[4] = true
            checkAchievement()
        }
        if (player.currentTheme != "electronTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("electronTheme")
            $(".modal-content").addClass("electronTheme")
            player.currentTheme = "electronTheme"
        }
    }
    nucleusTheme = () => {
        if (player.themesTried[5] == false) {
            player.themesTried[5] = true
            checkAchievement()
        }
        if (player.currentTheme != "nucleusTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("nucleusTheme")
            $(".modal-content").addClass("nucleusTheme")
            player.currentTheme = "nucleusTheme"
        }
    }
    gravityTheme = () => {
        if (player.themesTried[6] == false) {
            player.themesTried[6] = true
            checkAchievement()
        }
        if (player.currentTheme != "gravityTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("gravityTheme")
            $(".modal-content").addClass("gravityTheme")
            player.currentTheme = "gravityTheme"
        }
    }
    darkMatterTheme = () => {
        if (player.themesTried[7] == false) {
            player.themesTried[7] = true
            checkAchievement()
        }
        if (player.currentTheme != "darkMatterTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("darkMatterTheme")
            $(".modal-content").addClass("darkMatterTheme")
            player.currentTheme = "darkMatterTheme"
        }
    }
    ultimaTheme = () => {
        if (player.themesTried[8] == false) {
            player.themesTried[8] = true
            checkAchievement()
        }
        if (player.currentTheme != "ultimaTheme") {
            $("body").removeClass(player.currentTheme)
            $(".modal-content").removeClass(player.currentTheme)
            $("body").addClass("ultimaTheme")
            $(".modal-content").addClass("ultimaTheme")
            player.currentTheme = "ultimaTheme"
        }
    }

    $(".themeButton").click(function () {
        // console.log(this.id + " clicked")
        if (this.id == "defaultTheme") {
            if (player.maxCount > 0) {
                // console.log("player.maxCount > 0")
                var selectTheme = window["defaultTheme"] /* adapted from code @ "https://www.viralpatel.net/calling-javascript-function-from-string/" */
                selectTheme();
                console.log("change theme to default")
                if (!player.themeChanged) player.themeChanged = true
            }
        } else if (this.id == "ultimaTheme") {
            ultimaTheme()
            if (!player.themeChanged) player.themeChanged = true
            console.log("change theme to Ultima")
        } else {
            var selectedTheme = this.id.substring(0, (this.id.length - 5)) /* take element name from button id" */
            for (i = 0; i < NUM_ELEMENTS; i++) {
                if ((clickers[i].id == selectedTheme) && (this.id != player.currentTheme) && clickers[i].themeUnlocked) {
                    var selectTheme = window[this.id]; /* adapted from code @ "https://www.viralpatel.net/calling-javascript-function-from-string/" */
                    selectTheme();
                    if (!player.themeChanged) player.themeChanged = true
                    console.log("change theme to " + selectedTheme)
                }
            }
        }
        checkAchievement()
    })

    // JQUERY STYLE + CONTENT
    $("body").addClass("defaultTheme")
    $(".gameTitle").text(GAME_TITLE)
    $(".email").text(CONTACT_EMAIL)
    $(".playerName").text(player.name)

    if (player.newGame == true) newGame(player.name)
    // debug()
})