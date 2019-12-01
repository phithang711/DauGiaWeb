
$(document).ready(function() {
    let isBid = true;

    $(".bid-collapse").on('show.bs.collapse', function() {
        $(".autobid-collapse").collapse('hide');
        isBid = true;
        $('#buy-btn').prop('disabled',false);
    })

    $(".autobid-collapse").on('show.bs.collapse', function() {
        $(".bid-collapse").collapse('hide');
        isBid = false;
        $('#buy-btn').prop('disabled',true);
    })

    $('.bid-price').change(function() {
        if (isBid){
            if (( $(this).val() === '0' || $(this).val().length === 0 )){
                $('#buy-btn').prop('disabled',true);
            } else {
                $('#buy-btn').prop('disabled',false);
            }
        } else {
            if (( $('#autobid-price').val() === '0' || $('#maximum-price').val() === '0' || $('#maximum-price').val().length === 0 || $('#autobid-price').val().length === 0 )){
                $('#buy-btn').prop('disabled',true);
            } else {
                $('#buy-btn').prop('disabled',false);
            }
        }

    });
    
    $('#buy-btn').on('clicked', function(){

    })

    $('#buy-now').on('clicked', function(){
        
    })
});



