
// $(".product-name").attr("href",()=>{
//     return data-type+"/"+data-index;
// });

// $(".product-name").on("click",()=>{
//     console.log(data-type+"/"+data-index);
// });

$(".section-title").text(function(){
    var curText=$(this).text();
    return curText.charAt(0).toUpperCase()+curText.substring(1).toLowerCase();
});
