// // // import titleize from "titleize";
// // import titleize from "titleize";

// // const wordTest = () => {
// //   var str = "skylinesms";
// //   // return str.charAt(0).toUpperCase() + str.slice(1);
// //   return titleize(str);
// // };

// // console.time(wordTest());
// // console.timeEnd(wordTest());

// /**
//  * @param {string[]} ops - List of operations
//  * @return {number} - Sum of scores after performing all operations
//  */

// var calPoints = function (ops) {
//   var resultFinal = null;

//   let record = ops.reduce((result, element) => {
//     if (!isNaN(Number(element))) {
//       result.push(Number(element));
//     }
//     if (element === "+") {
//       var val = result[result.length - 1] + result[result.length - 2];
//       result.push(val);
//     }
//     if (element === "D") {
//       var doubleVal = result[result.length - 1] * 2;
//       result.push(doubleVal);
//     }
//     if (element === "C") {
//       result.pop();
//     }
//     return result;
//   }, []);

//   resultFinal = record.reduce((a, b) => a + b, 0);

//   return resultFinal;
// };

// // // var ops = ["5", "2", "C", "D", "+"];

// // var ops = ["5", "-2", "4", "C", "D", "9", "+", "+"];

// // // var ops = readline().split(" ");

// // console.log(calPoints(ops));

// var isValid = function (s) {
//   let stack = [];

//   for (let i = 0; i < s.length; i++) {
//     let x = s[i];
//     if (x == "(" || x == "[" || x == "{") {
//       stack.push(x);
//       continue;
//     }

//     if (stack.length == 0) return false;

//     let check;
//     switch (x) {
//       case ")":
//         check = stack.pop();
//         if (check == "{" || check == "[") return false;
//         break;
//       case "]":
//         check = stack.pop();
//         if (check == "{" || check == "(") return false;
//         break;
//       case "}":
//         check = stack.pop();
//         if (check == "(" || check == "]") return false;
//         break;
//     }
//   }

//   return stack.length == 0;
// };

// var s = "{}[]";

// if (isValid(s)) console.log("valid");
// else console.log("invalid");

function printTwoElements(arr, size) {
  var i;
  var output = [];

  for (i = 0; i < size; i++) {
    var abs_value = Math.abs(arr[i]);
    if (arr[abs_value - 1] > 0) arr[abs_value - 1] = -arr[abs_value - 1];
    else output.push(abs_value);
  }

  // document.write("<br> and the missing element is ");
  for (i = 0; i < size; i++) {
    if (arr[i] > 0) output.push(i + 1);
  }
  return output;
}

/* Driver code */
var arr = [1, 2, 3, 2];
var n = arr.length;
console.log(printTwoElements(arr, n));
