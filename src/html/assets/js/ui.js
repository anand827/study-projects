'use strict';

// Ui Scripting
$(document).ready(function () {
    //On type Search
    $('.js__selectDrop__searchArea').focus(function () {
        $('.js__selectDrop__dropContainer').show();
        $('input[data-field="search"]')[0].focus();
    });
    $(".selectDrop__list").hide();
    $(".js__selectDrop__searchBox").on("keyup click input", function () {
        if (this.value.length > 0) {
            $(".selectDrop__list").hide().filter(function () {
                return $(this).text().toLowerCase().indexOf($(".js__selectDrop__searchBox").val().toLowerCase()) != -1;
            }).show();
        } else {
            $(".selectDrop__list").hide();
        }
    });
    $('.selectDrop__list').click(function () {
        var listValue = $(this).text();
        // alert(listValue);
        $('.js__selectDrop__searchBox').val(listValue);
        $('.js__selectDrop__searchArea').val(listValue);
    });
    $(document).mouseup(function (e) {
        var container = $(".js__selectDrop__dropContainer");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
    //On type Search
    //slider
    // $('[data-slider="1"]').addClass('active');
    // $('[data-slider="1"]').show();
    // setInterval(function() {
    //     var id = $('.slider__list.active').attr('data-slider');
    //     $('[data-slider]').removeClass('active').hide();
    //     $('[data-slider="' + id + '"]').next().addClass('active').show();
    // }, 2000);
});