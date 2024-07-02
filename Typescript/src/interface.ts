// interface User {
//     firstName : string,
//     lastName : string,
//     age : number
// }

// function isEligible(user:User):boolean
// {
//     if(user.age>=18)
//         return true;
//     return false;
// }

// const iseligible = isEligible({
//     firstName:"Dev",
//     lastName:"Varshney",
//     age:22
// })

// if(iseligible)
//     console.log("Adult");
// else
//     console.log("Minor");

interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

class Employee implements Person {
  name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}
