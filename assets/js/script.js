$(document).ready(function () {

    var n1 = 0,
        n2 = 0,
        n3 = 0,
        n4 = 0,
        n5 = 0,
        n6 = 0,
        n7 = 0,
        n8 = 0,
        b1_upgradeOneUnlocked = false,
        b1_upgradeTwoUnlocked = false,
        b1_upgradeThreeUnlocked = false;
        b2_upgradeOneUnlocked = false,
        b2_upgradeTwoUnlocked = false,
        b2_upgradeThreeUnlocked = false;

    unlockUpgrade = (btn, unlock) => {
        console.log("Upgrade " + unlock + " unlocked for Button " + btn + "!");
    }

    $("button").click(function () {
        var btn = $(this).attr("id");
        switch (btn) {
            case "b1":
                n1++;
                console.log(n1 + " clicks on button 1");

                if ((n1 == 3) && !b1_upgradeOneUnlocked) {
                    unlockUpgrade(1, 1);
                    b1_upgradeOneUnlocked = true;
                }

                if ((n1 == 6) && !b1_upgradeTwoUnlocked) {
                    unlockUpgrade(1, 2);
                    b1_upgradeTwoUnlocked = true;
                }
                break;

            case "b2":
                n2++;
                console.log(n1 + " clicks on button 2");

                if ((n2 == 3) && !b2_upgradeOneUnlocked) {
                    unlockUpgrade(2, 1);
                    b2_upgradeOneUnlocked = true;
                }

                if ((n2 == 6) && !b2_upgradeTwoUnlocked) {
                    unlockUpgrade(2, 2);
                    b2_upgradeTwoUnlocked = true;
                }
                break;

            case "b3":
                n3++;
                console.log(n3, "clicks on button 3");
                break;
            case "b4":
                n4++;
                console.log(n4, "clicks on button 4");
                break;
            case "b5":
                n5++;
                console.log(n5, "clicks on button 5");
                break;
            case "b6":
                n6++;
                console.log(n6, "clicks on button 6");
                break;
            case "b7":
                n7++;
                console.log(n7, "clicks on button 7");
                break;
            case "b8":
                n8++;
                console.log(n8, "clicks on button 8");
                break;
        }


    });

});