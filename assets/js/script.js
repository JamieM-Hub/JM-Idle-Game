var n1 = 0,
    n2 = 0,
    n3 = 0,
    n4 = 0,
    n5 = 0,
    n6 = 0,
    n7 = 0,
    n8 = 0;

$(document).ready(function () {

    $("button").click(function () {
        var btn = $(this).attr("id");
        switch (btn) {
            case "b1":
                n1++;
                console.log(n1, "clicks on button 1");
                break;
            case "b2":
                n2++;
                console.log(n2, "clicks on button 2");
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