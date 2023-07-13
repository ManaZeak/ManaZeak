/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./front/js/auth/TellUsMore.js ***!
  \*************************************/
// Tell us more ; Update max value for birthday selection to today
var sessionDate = new Date();
var yyyy = sessionDate.getFullYear();
var mm = sessionDate.getMonth() + 1;
var dd = sessionDate.getDate();
// Prefix day with a zero if needed
if (dd < 10) {
  dd = "0".concat(dd);
}
// Prefix month with a zero if needed
if (mm < 10) {
  mm = "0".concat(mm);
}
// Create output string and update max attribute on birthday date input
document.getElementById('birthday-input').setAttribute('max', "".concat(yyyy, "-").concat(mm, "-").concat(dd));
// Script so user can only enter to submit credentials 
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('tellusmore-form').submit();
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvdGVsbHVzbW9yZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLElBQU1BLFdBQVcsR0FBRyxJQUFJQyxJQUFJLENBQUMsQ0FBQztBQUM5QixJQUFNQyxJQUFJLEdBQUdGLFdBQVcsQ0FBQ0csV0FBVyxDQUFDLENBQUM7QUFDdEMsSUFBSUMsRUFBRSxHQUFHSixXQUFXLENBQUNLLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNuQyxJQUFJQyxFQUFFLEdBQUdOLFdBQVcsQ0FBQ08sT0FBTyxDQUFDLENBQUM7QUFDOUI7QUFDQSxJQUFJRCxFQUFFLEdBQUcsRUFBRSxFQUFFO0VBQ1hBLEVBQUUsT0FBQUUsTUFBQSxDQUFPRixFQUFFLENBQUU7QUFDZjtBQUNBO0FBQ0EsSUFBSUYsRUFBRSxHQUFHLEVBQUUsRUFBRTtFQUNYQSxFQUFFLE9BQUFJLE1BQUEsQ0FBT0osRUFBRSxDQUFFO0FBQ2Y7QUFDQTtBQUNBSyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxZQUFZLENBQUMsS0FBSyxLQUFBSCxNQUFBLENBQUtOLElBQUksT0FBQU0sTUFBQSxDQUFJSixFQUFFLE9BQUFJLE1BQUEsQ0FBSUYsRUFBRSxDQUFFLENBQUM7QUFDcEY7QUFDQUcsUUFBUSxDQUFDRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBQUMsQ0FBQyxFQUFJO0VBQ3pDLElBQUlBLENBQUMsQ0FBQ0MsR0FBRyxLQUFLLE9BQU8sRUFBRTtJQUNyQkQsQ0FBQyxDQUFDRSxjQUFjLENBQUMsQ0FBQztJQUNsQk4sUUFBUSxDQUFDQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQ00sTUFBTSxDQUFDLENBQUM7RUFDckQ7QUFDRixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL21hbmF6ZWFrLy4vZnJvbnQvanMvYXV0aC9UZWxsVXNNb3JlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRlbGwgdXMgbW9yZSA7IFVwZGF0ZSBtYXggdmFsdWUgZm9yIGJpcnRoZGF5IHNlbGVjdGlvbiB0byB0b2RheVxuY29uc3Qgc2Vzc2lvbkRhdGUgPSBuZXcgRGF0ZSgpO1xuY29uc3QgeXl5eSA9IHNlc3Npb25EYXRlLmdldEZ1bGxZZWFyKCk7XG5sZXQgbW0gPSBzZXNzaW9uRGF0ZS5nZXRNb250aCgpICsgMTtcbmxldCBkZCA9IHNlc3Npb25EYXRlLmdldERhdGUoKTtcbi8vIFByZWZpeCBkYXkgd2l0aCBhIHplcm8gaWYgbmVlZGVkXG5pZiAoZGQgPCAxMCkge1xuICBkZCA9IGAwJHtkZH1gO1xufVxuLy8gUHJlZml4IG1vbnRoIHdpdGggYSB6ZXJvIGlmIG5lZWRlZFxuaWYgKG1tIDwgMTApIHtcbiAgbW0gPSBgMCR7bW19YDtcbn1cbi8vIENyZWF0ZSBvdXRwdXQgc3RyaW5nIGFuZCB1cGRhdGUgbWF4IGF0dHJpYnV0ZSBvbiBiaXJ0aGRheSBkYXRlIGlucHV0XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmlydGhkYXktaW5wdXQnKS5zZXRBdHRyaWJ1dGUoJ21heCcsIGAke3l5eXl9LSR7bW19LSR7ZGR9YCk7XG4vLyBTY3JpcHQgc28gdXNlciBjYW4gb25seSBlbnRlciB0byBzdWJtaXQgY3JlZGVudGlhbHMgXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGUgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbGx1c21vcmUtZm9ybScpLnN1Ym1pdCgpO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6WyJzZXNzaW9uRGF0ZSIsIkRhdGUiLCJ5eXl5IiwiZ2V0RnVsbFllYXIiLCJtbSIsImdldE1vbnRoIiwiZGQiLCJnZXREYXRlIiwiY29uY2F0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5IiwicHJldmVudERlZmF1bHQiLCJzdWJtaXQiXSwic291cmNlUm9vdCI6IiJ9