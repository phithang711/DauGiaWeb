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
        $('#deviceid').append(`<option value="-1" selected> 
                                       ${brand} ${model}
                                  </option>`);
    }
});

$("#other").click(function() {
    $("#target").submit();
});