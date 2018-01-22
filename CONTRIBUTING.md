# Contributing to ManaZeak

Any contribution, of any type is welcome! If you want to make a suggestion, feel free to do so! Furthermore, if you want to add pieces of code, please use the following conventions :

Nota Bene : All variables and functions must be [lowerCamelCase](https://en.wiktionary.org/wiki/CamelCase). Every block is indented of 4 spaces. Function, and more generally variables must be alphabetically sorted (in all kind of files). Finally, if there is several variable attribution at once, align the '=' or ':' sign with the longest variable.

## - Js :

```
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  MyClas class                                   *
 *                                                 *
 *  Class descripton                               *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

// Class constant var

class MyClass {
    constructor() {

        // Your constructor instructions
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : myPublicFunction (public)
     * class  : MyClass
     * desc   : myPublicFunction description
     * arg    : {type} arg - A function argument
     * return : {type} the returned value
     **/
    myPublicFunction(arg) {
        // Your code here
        return true
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _myPrivateFunction (private)
     * class  : MyClass
     * desc   : _myPrivateFunction description
     * arg    : {type} arg - A function argument
     **/
    _myPrivateFunction(arg) {

    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getMyVar()      { return this.myVar;  }

    setMyVar(myVar) { this.myVar = myVar; }

};

```

## - SCSS

```
$myLocalVar: 0;

#levelOne {

    position: absolute;

    .insideJob {
        margin: $myLocalVar;
    }

    div {
        padding: 0;

        #levelThree {
            display: inline-block;
            z-index: 999;
        }
    }
}

```
