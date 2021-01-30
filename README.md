# Algori.com

Simple Algorithm Visualiser 



## Planned Sort Animatation Engine Spec:

- setColor:
  - Array Syntax ["setColor",[array of ids or $ALL, $LHALF, $RHALF], "valid css color OR valid inbuilt variable prefixed with $"]
  - String Syntax setColor : (list of ids or $ALL, $LHALF, $RHALF split by commas); (valid css color OR valid inbuilt variable prefixed with $)
  
  - Description - Sets the color of ids in array to given color 

  - Inbuilt color variables:
    - $BASE
    - $CHECKING
    - $DONE

- swap:
  - Array Syntax ["swap",id of first item, id of second item]
  - String Syntax swap: id of first item; id of second item

  - Description - Swaps two items of array



- setValue:
  - Array Syntax ["setItem",[list of ids], value]
  - String Syntax setItem: id of first item; value

  - Description - Sets item in array to given value

- setArray:
  - Array Syntax ["setArray",[new array to set to], "Optional css color or valid inbuilt variable to set all bars to"]
  - String Syntax setArray: (list of values seperated by commas to set to); (Optional css color or valid inbuilt variable to set all bars to)

  - Description - Sets array to given array

  - Inbuilt color variables:
    - $BASE
    - $CHECKING
    - $DONE


- resetArray:
  - Array Syntax ["resetArray", num of bars, "valid css color OR valid inbuilt variable prefixed with $"]
  - String Syntax resetArray: (num of bars); (valid css color OR valid inbuilt variable prefixed with $)

  - Description - Reset array

  - Inbuilt color variables:
    - $BASE
    - $CHECKING
    - $DONE


- do:
  - Array Syntax ["do",[array of animate command arrays], interval between each action or $userSet]

  - Description - Runs all commands in array every (interval between each action)ms. If $userSet is selected then interval with be defined by animation speed
  

- doSim:
  - Array Syntax ["doSim",[array of animate command arrays]]

  - Description - Runs all commands in array simulteneously

  - (Probably should be deprecated and replaced with just puting 0 as interval in do command)

- doIn:
  - Array Syntax ["doSim", [array of animate command arrays], time until execute]

  - Description - Runs commands in array after set time


- setRunTimeDisplay:

  - Syntax ["setRunTimeDisplay", runtime in ms]
  - String setRunTimeDisplay: (runtime in ms)

  - Description - Sets runtime in bottom right


- setComparisonsDisplay:

  - Syntax ["setComparisonsDisplay", no of swaps]
  - String setComparisonsDisplay: (no of swaps)

  - Description - Sets comparisons when hovering over runtime in bottom right


- setSwapsDisplay:

  - Syntax ["setRunTimeDisplay", runtime in ms]
  - String setRunTimeDisplay: (runtime in ms)

  - Description - Sets swaps when hovering over runtime in bottom right


- showRunTimeDisplay:
  - Syntax ["showRunTimeDisplay"]
  - String showRunTimeDisplay

  - Description - Shows additional comparisons and swap info in bottom right



- startAnimation:
  - Array Syntax ["startAnimation"]
  - String Syntax startAnimation

  - Description - Sets activeAnimation State to true



- endAnimation:
  - Array Syntax ["endAnimation"]
  - String Syntax endAnimation

  - Description - Sets activeAnimation State to false


