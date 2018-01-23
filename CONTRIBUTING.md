# Contributing to ManaZeak

Any contribution, of any type is welcome! Here are some guidelines on how you can help improve ManaZeak.

## Feature suggestion

We have a clear (also own) vision of what ManaZeak will become. Nevertheless, we surely miss a lot of cool features! An easy way for you to contribute is to open an [issue](https://github.com/Squadella/ManaZeak/issues/new) and suggest a feature : give us the more details you can about what would be nice to have!

## Bug reporting

Another easy way to help us out is to report any bug you could (will?) encounter. The more you give context (what triggers it, what does it broke etc.) about it, the faster it will be patched! To do so, open an [issue](https://github.com/Squadella/ManaZeak/issues/new) and report your bug!

## Code contribution

 If you are brave enough to read our code and you want to add pieces of code, please use the following guidelines :

#### Pull request

When you make a pull request, first of all thank you! Please explain your feature (documented code is a :ok_hand:), also remain available if we have questions before merging. Finally, we recommend you to read this [Github](https://github.com/blog/1943-how-to-write-the-perfect-pull-request) article, which is a good start on how to do a clean pull request. Again, thank you!

#### Js (ECMA6) code convention

**NB**: *All variables and functions must be [lowerCamelCase](https://en.wiktionary.org/wiki/CamelCase). Every block is indented of 4 spaces. Function, and more generally variables must be alphabetically sorted (in all kind of files). Finally, if there is several variable attribution at once, align the '=' sign with the longest variable. Comment trick parts.*

```
/* * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                 *
 *  MyClas class                                   *
 *                                                 *
 *  Class descripton                               *
 *  id   : {int} argument example                  *
 *  data : {object} another argument example       *
 *                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

// Class constant var

class MyClass {

    constructor(id, data) {
        this.id   = id;
        this.data = data;
        // Your constructor instructions
    }

//  --------------------------------  PUBLIC METHODS  ---------------------------------  //

    /**
     * method : myFirstPublicFunction (public)
     * class  : MyClass
     * desc   : myFirstPublicFunction description
     * arg    : {type} arg - argument description
     * return : {type} the returned value
     **/
    myFirstPublicFunction(arg) {
        // Your code here
        // If you have todo's to write: // TODO : ...
        return true
    }


    /**
     * method : mySecondPublicFunction (public)
     * class  : MyClass
     * desc   : mySecondPublicFunction description
     **/
    mySecondPublicFunction() {
        // Your code here
    }

//  --------------------------------  PRIVATE METHODS  --------------------------------  //

    /**
     * method : _myPrivateFunction (private)
     * class  : MyClass
     * desc   : _myPrivateFunction description
     * arg    : {type} arg - argument description
     **/
    _myPrivateFunction(arg) {
        // Your code here
    }

//  ------------------------------  GETTERS / SETTERS  --------------------------------  //

    getData()     { return this.data; }

    setData(data) { this.data = data; }

};
```

#### Python3

**NB**: *TODO @Squadella*
```
# TODO
```

#### SCSS code convention

**NB**: *TODO @ArthurBeaulieu @Oxydiz*
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
