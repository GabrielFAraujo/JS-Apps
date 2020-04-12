//Inserting Values

function insert(num) {
    //Don't put many 0 without value(Don't fully implement)
    var lastNum;

    if(document.form.textview.value == 0 && lastNum == 0) {
        document.querySelector('.textview') = "";
    }
        
    else {
        document.form.textview.value = document.form.textview.value + num;
    }    
    lastNum = num;
}

function equal() {
    var exp = document.form.textview.value;
    if(exp) {
        document.form.textview.value = eval(exp);
    }
}

function clean() {
    document.form.textview.value = "";
}

function backspace() {
    var exp = document.form.textview.value;
    document.form.textview.value = exp.substring(0,exp.length-1);
}

