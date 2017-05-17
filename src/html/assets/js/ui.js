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
    //Social Functionalities
    $('.socialFunctions__commentSubmit').click(function () {
        var commentID = $('.socialFunctions__commentId').val();
        var comment = $('.socialFunctions__commentBox').val();
        var appendDiv = '<div class="socialFunctions__commentShow"><div class="socialFunctions__commentIdShow"><h3 class="socialFunctions__commentIdValue">' + commentID + ':</h3></div><div class="socialFunctions__commentTextBox"><textarea class="socialFunctions__CommentBoxContent" readonly>' + comment + '</textarea></div><div class="socialFunctions__options"><a href="javascript:;" class="socialFunctions__commentBoxEdit">Edit</a> <a href="javascript:;" class="socialFunctions__commentBoxDelete">Delete</a></div></div>';
        if ($('.socialFunctions__commentId').val().length == 0 || $('.socialFunctions__commentBox').val().length == 0) {
            alert('No Value');
        } else {
            $('.socialFunctions__commentSection').append(appendDiv);
            // alert('Value Presented');
            // alert(commentID);
            // alert(comment);
            editDelete();
        }
        $('.socialFunctions__commentId').val('');
        $('.socialFunctions__commentBox').val('');
    });
    $('.socialFunctions__commentDiscard').click(function () {
        $('.socialFunctions__commentId').val('');
        $('.socialFunctions__commentBox').val('');
    });
    editDelete();

    function editDelete() {
        //Delete Function
        $('.socialFunctions__commentBoxDelete').click(function () {
            $(this).parents('.socialFunctions__commentShow').remove();
        });
        //Edit Function
        $('.socialFunctions__commentBoxEdit').click(function () {
            $(this).parents('.socialFunctions__commentShow').find('.socialFunctions__CommentBoxContent').addClass('socialFunctions__CommentBoxContent--active').removeAttr('readonly');
        });
    }

    //String Seperation
    $('.string__inputSubmit').click(function () {
        var getVal = $('.string__getValue').val();
        var valSplit = getVal.split(',');
        var firstVal = [];
        var secondVal = [];
        for (var i = 0; i < valSplit.length; i++) {
            //console.log(valSplit[i].split('.'));
            var pull = valSplit[i].split('.');
            firstVal.push(pull[0]);
            secondVal.push('.' + pull[1]);
        }
        $('.string__inputOne').val(firstVal);
        $('.string__inputTwo').val(secondVal);
    });
});