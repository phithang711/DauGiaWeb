var links = document.getElementsByClassName("product-name");
links[0].onclick = function() {
        console.log(document.getElementsByClassName("product-name").index(this));
    }
    // $('product-name').click(function() {
    //     console.log($('product-name').index(this));
    // });