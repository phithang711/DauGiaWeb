$(document).ready(function() {
    $('#summernote').summernote({
        popover: {},
        height: 100
    });
});

$(document).ready(function() {

    var quantitiy = 0;
    $('.quantity-right-plus').click(function(e) {

        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#uploadDevice_stepPrice').val());

        // If is not undefined

        $('#uploadDevice_stepPrice').val(quantity + 10);


        // Increment

    });

    $('.quantity-left-minus').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#uploadDevice_stepPrice').val());

        // If is not undefined

        // Increment
        if (quantity > 0) {
            $('#uploadDevice_stepPrice').val(quantity - 10);
        }
    });

});

$('#addNewDevice').click(function(e) {
    var brand = $('#brand').val();
    var model = $('#model').val();
    console.log($('#images')[0].files);
    if (brand !== "" && model !== "" && $('#images')[0].files.length === 3) {
        $('#deviceid').append(`<option value="-1"> 
                                       ${brand} ${model}
                                  </option>`);
        $("#deviceid option[value='-1']").each(function() {
            $(this).attr('selected', 'selected');
        });
        $('#myModal').modal('hide');
    } else {
        alert("Please choose 3 pictures for the new device");
    }

});



$('.btn-clear').click(function(e) {
    $("#images").reset();
    $('#brand').reset();
    $('#model').reset();

    // $("#deviceid option[value='-1']").each(function() {
    //     $(this).remove();
    // });

    // if (brand !== "" && model !== "" && $('#images')[0].files.length === 3) {
    //     $('#deviceid').append(`<option value="-1"> 
    //                                    ${brand} ${model}
    //                               </option>`);

    //     $("#deviceid option[value='-1']").each(function() {
    //         $(this).attr('selected', 'selected');
    //     });
    // }
});

$("#other").click(function() {
    $("#target").submit();
});

$('#submitForm').click(function() {
    var valid = true;
    var brand = $('#brand').val();
    var model = $('#model').val();
    if ($('#deviceid').children("option:selected").val() !== "-1") {
        if (brand === "" || model === "" || $('#images')[0].files.length !== 3) {
            valid = false;
        }
    } else {

    }
    $("#target").submit();
});