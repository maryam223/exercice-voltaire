var selection_image1 = document.querySelector('.min-image1');
var selection_image2 = document.querySelector('.min-image2');
var selection_image3 = document.querySelector('.min-image3');
var image_agrandie = document.querySelector('.max-image');

selection_image1.onclick = function() {
    image_agrandie.src = selection_image1.src;
}

selection_image2.onclick = function() {
    image_agrandie.src = selection_image2.src;
}

selection_image3.onclick = function() {
    image_agrandie.src = selection_image3.src;
}