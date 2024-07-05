const arr=[5,2,10];
arr.sort((a,b)=>{
    console.log({a,b})
    if(a<b){
        return -1;
    }else{
        return 1;
    }
});
console.log({arr})