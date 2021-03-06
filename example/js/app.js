var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

var SignaturePad = require('signature-pad');
signaturePad = new SignaturePad(canvas);

signaturePad.onBegin = function (event) {
    document.getElementById("description").innerHTML = "Signing...";
};

signaturePad.onEnd = function (event) {
    document.getElementById("description").innerHTML = "Signed";
};

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
    document.getElementById("description").innerHTML = "Sign above";
});

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        window.open(signaturePad.toDataURL());
    }
});
