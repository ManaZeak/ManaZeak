/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./front/js/auth/Redirect.js ***!
  \***********************************/
// Redirect user to login after 5 seconds, and update redirect string
var redirectString = document.getElementById('redirect-string');
var counter = 0;
var id = setInterval(function () {
  // Stoping condition, redirect to login page
  if (counter === 4) {
    clearInterval(id);
    location.replace('login');
  }
  // Update text with remaining time, 5 must be displayed by default in HTML when loaded
  if (redirectString !== null && redirectString !== void 0 && redirectString.innerHTML) {
    redirectString.innerHTML = redirectString.innerHTML.replace(/\d/g, "".concat(4 - counter));
  }
  // Increment counter
  ++counter;
}, 1000);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVkaXJlY3QuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxJQUFNQSxjQUFjLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGlCQUFpQixDQUFDO0FBQ2pFLElBQUlDLE9BQU8sR0FBRyxDQUFDO0FBQ2YsSUFBTUMsRUFBRSxHQUFHQyxXQUFXLENBQUMsWUFBTTtFQUMzQjtFQUNBLElBQUlGLE9BQU8sS0FBSyxDQUFDLEVBQUU7SUFDakJHLGFBQWEsQ0FBQ0YsRUFBRSxDQUFDO0lBQ2pCRyxRQUFRLENBQUNDLE9BQU8sQ0FBQyxPQUFPLENBQUM7RUFDM0I7RUFDQTtFQUNBLElBQUlSLGNBQWMsYUFBZEEsY0FBYyxlQUFkQSxjQUFjLENBQUVTLFNBQVMsRUFBRTtJQUM3QlQsY0FBYyxDQUFDUyxTQUFTLEdBQUdULGNBQWMsQ0FBQ1MsU0FBUyxDQUFDRCxPQUFPLENBQUMsS0FBSyxLQUFBRSxNQUFBLENBQUssQ0FBQyxHQUFHUCxPQUFPLENBQUUsQ0FBQztFQUN0RjtFQUNBO0VBQ0EsRUFBRUEsT0FBTztBQUNYLENBQUMsRUFBRSxJQUFJLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hbmF6ZWFrLy4vZnJvbnQvanMvYXV0aC9SZWRpcmVjdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBSZWRpcmVjdCB1c2VyIHRvIGxvZ2luIGFmdGVyIDUgc2Vjb25kcywgYW5kIHVwZGF0ZSByZWRpcmVjdCBzdHJpbmdcbmNvbnN0IHJlZGlyZWN0U3RyaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZGlyZWN0LXN0cmluZycpO1xubGV0IGNvdW50ZXIgPSAwO1xuY29uc3QgaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gIC8vIFN0b3BpbmcgY29uZGl0aW9uLCByZWRpcmVjdCB0byBsb2dpbiBwYWdlXG4gIGlmIChjb3VudGVyID09PSA0KSB7XG4gICAgY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgbG9jYXRpb24ucmVwbGFjZSgnbG9naW4nKTtcbiAgfVxuICAvLyBVcGRhdGUgdGV4dCB3aXRoIHJlbWFpbmluZyB0aW1lLCA1IG11c3QgYmUgZGlzcGxheWVkIGJ5IGRlZmF1bHQgaW4gSFRNTCB3aGVuIGxvYWRlZFxuICBpZiAocmVkaXJlY3RTdHJpbmc/LmlubmVySFRNTCkge1xuICAgIHJlZGlyZWN0U3RyaW5nLmlubmVySFRNTCA9IHJlZGlyZWN0U3RyaW5nLmlubmVySFRNTC5yZXBsYWNlKC9cXGQvZywgYCR7NCAtIGNvdW50ZXJ9YCk7XG4gIH1cbiAgLy8gSW5jcmVtZW50IGNvdW50ZXJcbiAgKytjb3VudGVyO1xufSwgMTAwMCk7XG4iXSwibmFtZXMiOlsicmVkaXJlY3RTdHJpbmciLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY291bnRlciIsImlkIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwibG9jYXRpb24iLCJyZXBsYWNlIiwiaW5uZXJIVE1MIiwiY29uY2F0Il0sInNvdXJjZVJvb3QiOiIifQ==