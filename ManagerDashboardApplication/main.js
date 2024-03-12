function rgb(r, g, b){
    return 'rgb('+r+', '+g+', '+b+')';
}

var cR = 0.0, cG = 0.0, cB = 0.0
var iR = 1, iG = 2, iB = 3

function changeColor() {
    cR += iR;
    cG += iG;
    cB += iB;
    if (cR >= 255.0 || cR <= 0.0) {
        iR = -iR
    }
    if (cG >= 255.0 || cG <= 0.0) {
        iG = -iG
    }
    if (cB >= 255.0 || cB <= 0.0) {
        iB = -iB
    }
    //console.log(rgb(cR, cG, cB))
    document.getElementById("button_troll").style.color = rgb(cR, cG, cB)
}

var names = ['Trịnh Quý Thiện', 'Trần Viết Thịnh', 'Đặng Văn Nhớ', 'Nguyễn Thành Nhân', 'Lưu Văn Trường']
var currentName = 0;

function changeName() {
    currentName += 1
    if (currentName == 5)
        currentName = 0
    //console.log(currentName)
    document.getElementById("name").textContent = names[currentName]
}

setInterval(changeName, 100)
setInterval(changeColor, 10)