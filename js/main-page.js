//레이어 팝업
$(".layer1").click(function(e) {
    e.preventDefault();
    $("#layer").css("display", "block");
    // $("#layer").show();
    // $("#layer").fadeIn();
    // $("#layer").slideDown();
});
$("#layer .close").click(function(e) {
    e.preventDefault();
    // $("#layer").css("display", "block");
    // $("#layer").show();
    // $("#layer").fadeOut();
    $("#layer").slideUp();
});

//배너
//html 마크업 셋팅 -> css 연동 -> 제이쿼리 연동 --> 제이쿼리 호출
$(".ban").slick ({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true
});

//버튼 클릭시 메뉴 활성화 작업.
$(".tit .btn").click(function(e){
    e.preventDefault();
    // $("#cont_nav").css("display", "block");
    // $("#cont_nav").show();
    // $("#cont_nav").fadeIn();
    // $("#cont_nav").slideDown();
    // $("#cont_nav").toggle();
    // $("#cont_nav").fadeToggle();
    $("#cont_nav").slideToggle(200);
    $(this).toggleClass("on");
});