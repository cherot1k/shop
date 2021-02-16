function checkPrice(item, dollar){
    let number = (item.price * dollar)/100
    if(number - Math.trunc(number) < 0.5 && number - Math.trunc(number) !== 0){
        return (Math.trunc(number) * 100 + 50)
    }else if(number - Math.trunc(number) > 0.5){
        return (Math.trunc(number) * 100 + 100)
    }else{
        return (number*100);
    }
}
export {checkPrice}
