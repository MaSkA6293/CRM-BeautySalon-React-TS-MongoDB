import React from "react";

export default function MultipleSelect() {
  // class Rabbit {
  //   constructor(value) {
  //     this.eat = value;
  //   }
  //   get whatEat() {
  //     console.log("getter");
  //     return this.eat;
  //   }
  //   set whatEat(value) {
  //     console.log("setter");
  //     return (this.eat = value);
  //   }
  // }

  // function Rabbit() {
  //   let eat = "value";
  //   Object.defineProperty(this, "whatEat", {
  //     get: () => {
  //       return eat;
  //     },
  //     set: (val) => {
  //       eat = val;
  //     },
  //   });
  // }
  // let r1 = new Rabbit();
  // console.log(r1);
  //0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
  // function fib(number) {
  //   if (number < 2) {
  //     return number;
  //   }
  //   return fib(number - 1) + fib(number - 2);
  // }

  // console.log(fib(3)); //2
  // console.log(fib(3)); //3
  const a = [
    { _id: "5f736d571f121b3d9fc7f226…sId", categoryId: ["1", "2"] },
    { _id: "5f736d571f321fc7f226…sId", categoryId: ["1", "3"] },
    { _id: "5f736d571321f226…sId", categoryId: ["1", "3"] },
    { _id: "5f736d571f121321226…sId", categoryId: ["1", "2"] },
    { _id: "5f736d571f121b3216…sId", categoryId: ["1", "5"] },
    { _id: "5f736d571f1232f226…sId", categoryId: ["1", "6"] },
  ];
  console.log(a);
  const filter = "all";
  const afterFilter = a.filter((el) => el.categoryId.includes(filter));
  console.log("after", afterFilter);
  return <div></div>;
}
