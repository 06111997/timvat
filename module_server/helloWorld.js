module.exports.sayHi = function(){
    return "Hi nha!";
};

module.exports.sayHello = function(){
    return "Hello nha!";
};
function sayHai(){
    return "Hai";
}
function sayBello(){
    return "Bello";
}
module.exports.sayHiHe = function(nameFunc){
    if(nameFunc == "1"){
        return "Hai";
    }
    else if(nameFunc == "2"){
        return "Bello";
    }
    else{
        return "What !";
    }
}