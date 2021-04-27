


function fib(n,memo={}){
    if(n in memo)return memo[n]
    if(n <= 2) return 1;;

    memo[n] = fib(n-1,memo) + fib(n-2,memo);
    return memo[n]
}



// console.log(fib(50))


function gridTraveler(m,n,memo={}){

    let key = `${m}:${n}`;

    if(key in memo)return memo[key];
    if(m === 1 && n === 1)return 1;
    if(m === 0 || n === 0)return 0;

    memo[key] = gridTraveler(m-1,n,memo) + gridTraveler(m,n-1,memo);
    return memo[key]
}

// console.log(gridTraveler(4,5))



function canSum(totalSum,arr,memo={}){

    if(totalSum in memo)return memo[totalSum]
    if(totalSum === 0)return true;
    if(totalSum < 0)return false;

    for(let num of arr){
        let newSum = totalSum - num;
        
        if(canSum(newSum,arr,memo) === true){
            memo[totalSum] = true;
            return true;
        }
    }

    memo[totalSum] = false;
    return false;
}


function howSum(totalSum,arr,memo={}){

    if(totalSum in memo)return memo[totalSum]
    if(totalSum === 0)return [];
    if(totalSum < 0)return null;

    for(let num of arr){
        let newSum = totalSum - num;

        let ourResult = howSum(newSum,arr,memo);

        if(ourResult !== null){
         memo[totalSum] = [...ourResult,num]
         return memo[totalSum]
        }
    }
    memo[totalSum] = null;
    return null;
}


// console.log(canSum(300,[7,14]))
// console.log(canSum(300,[5,14]))
//  console.log(howSum(300,[7,14,2]))



 function howSum(totalSum,arr,memo={}){
    if(totalSum in memo)return memo[totalSum]
    if(totalSum === 0)return [];
    if(totalSum < 0)return null;

    for(let num of arr){
        let newSum = totalSum - num;

        let ourResult = howSum(newSum,arr,memo);

        if(ourResult !== null){
            memo[totalSum] = [...ourResult,num]
            return memo[totalSum]
        }
    }

    memo[totalSum] = null;
    return null;
 }


 console.log(howSum(30000,[14,7]))