const check = (age:number)=>
{
    if(age>=18)
        return "adult";
    return "minor";
}

const str:string = check(19);
console.log(str);