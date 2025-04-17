$(document).ready(function() {
    $(".file").click(function() {
        $("#toshow").attr("src", $(this).find("img").attr("src"));
        $("#overlay").show(200);
    });

    $("#overlay").click(function () {$(this).hide(200)});

    $(".load_file_btn").click(function() {
        $("#upload_overlay").show(200);
    });
    
    $("#upload_overlay").click(function(el) {
        if ($(el.target).attr("class") == "black_overlay") {
            $(this).hide(200);
        }
    });
});
