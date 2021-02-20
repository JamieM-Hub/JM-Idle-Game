$(document).ready(function () {

    var counter = [],
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
}

initialise(8, 3);

unlockUpgrade = (btn, unlock) => {
    console.log("Upgrade " + unlock + " unlocked for Button " + btn + "!");
    upgradeUnlocked[btn, unlock] = true;
}

incrementCounter = (counter, i) => {
    return counter + i;
}

$("button").click(function () {
    var btnID = $(this).attr("id");
    switch (btnID) {
        case "b1":
            counter[0] = incrementCounter(counter[0], 1);
            $(this).text(counter[0].toString());
    }

});