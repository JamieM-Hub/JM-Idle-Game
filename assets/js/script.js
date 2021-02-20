$(document).ready(function () {

    var counter = [],
        buttonID = [],
        upgradeUnlocked = [];

    initialise = (buttons, upgrades) => {
        for (let i = 0; i < buttons; i++) {
            counter[i] = 0;
            console.log(counter[i]);
            for (let j = 0; j < upgrades; j++) {
                upgradeUnlocked[i, j] = false;
                console.log(upgradeUnlocked[i, j]);
            }
        }
        buttonID[0] = "button 1";
        buttonID[1] = "button 2";
        buttonID[2] = "button 3";
        buttonID[3] = "button 4";
        buttonID[4] = "button 5";
        buttonID[5] = "button 6";
        buttonID[6] = "button 7";
        buttonID[7] = "button 8";
    }

    initialise(8, 3);

    unlockUpgrade = (btn, unlock) => {
        console.log("Upgrade " + unlock + " unlocked for Button " + btn + "!");
        upgradeUnlocked[btn, unlock] = true;
    }

    incrementCounter = (btn, counter, i) => {
        counter = counter + i;
        $(btn).text(n1.toString());
        return counter;
    }

    checkUpgrade = (btn, clicker) => {
        if ((clicker == 3) && !upgradeUnlocked[clicker, 1]) {
            unlockUpgrade(clicker, 1);
        }
        if ((clicker == 6) && !upgradeUnlocked[clicker, 2]) {
            unlockUpgrade(clicker, 2);
        }

        if ((n1 == 6) && !b1_upgradeTwoUnlocked) {
            unlockUpgrade(1, 2);
            b1_upgradeTwoUnlocked = true;
        }
    }

    $("button").click(function () {

        var btn = $(this).attr("id");
        switch (btn) {
            case "b1":
                n1 = incrementCounter(b1, n1, 1);
                checkUpgrade();
                break;

        }


    });

});