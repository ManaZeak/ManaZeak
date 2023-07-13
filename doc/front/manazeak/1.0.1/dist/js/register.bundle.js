/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./front/js/auth/Register.js ***!
  \***********************************/
// Parse url to check if it contains a ?invit-code=, so the input is auto-filled
var url = new URL(window.location.href);
var inviteCode = url.searchParams.get('invite-code');
var inviteCodeElement = document.getElementById('inviteCode-input');
// Update input value if url do contains a invit-code param
if (inviteCodeElement && inviteCode) {
  inviteCodeElement.value = inviteCode;
}
// Script so user can only enter to submit credentials 
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('register-form').submit();
  }
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvcmVnaXN0ZXIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxJQUFNQSxHQUFHLEdBQUcsSUFBSUMsR0FBRyxDQUFDQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDO0FBQ3pDLElBQU1DLFVBQVUsR0FBR0wsR0FBRyxDQUFDTSxZQUFZLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFDdEQsSUFBTUMsaUJBQWlCLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGtCQUFrQixDQUFDO0FBQ3JFO0FBQ0EsSUFBSUYsaUJBQWlCLElBQUlILFVBQVUsRUFBRTtFQUNuQ0csaUJBQWlCLENBQUNHLEtBQUssR0FBR04sVUFBVTtBQUN0QztBQUNBO0FBQ0FJLFFBQVEsQ0FBQ0csZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQUFDLENBQUMsRUFBSTtFQUN6QyxJQUFJQSxDQUFDLENBQUNDLEdBQUcsS0FBSyxPQUFPLEVBQUU7SUFDckJELENBQUMsQ0FBQ0UsY0FBYyxDQUFDLENBQUM7SUFDbEJOLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDTSxNQUFNLENBQUMsQ0FBQztFQUNuRDtBQUNGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFuYXplYWsvLi9mcm9udC9qcy9hdXRoL1JlZ2lzdGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFBhcnNlIHVybCB0byBjaGVjayBpZiBpdCBjb250YWlucyBhID9pbnZpdC1jb2RlPSwgc28gdGhlIGlucHV0IGlzIGF1dG8tZmlsbGVkXG5jb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbmNvbnN0IGludml0ZUNvZGUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnaW52aXRlLWNvZGUnKTtcbmNvbnN0IGludml0ZUNvZGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludml0ZUNvZGUtaW5wdXQnKTtcbi8vIFVwZGF0ZSBpbnB1dCB2YWx1ZSBpZiB1cmwgZG8gY29udGFpbnMgYSBpbnZpdC1jb2RlIHBhcmFtXG5pZiAoaW52aXRlQ29kZUVsZW1lbnQgJiYgaW52aXRlQ29kZSkge1xuICBpbnZpdGVDb2RlRWxlbWVudC52YWx1ZSA9IGludml0ZUNvZGU7XG59XG4vLyBTY3JpcHQgc28gdXNlciBjYW4gb25seSBlbnRlciB0byBzdWJtaXQgY3JlZGVudGlhbHMgXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGUgPT4ge1xuICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZ2lzdGVyLWZvcm0nKS5zdWJtaXQoKTtcbiAgfVxufSk7Il0sIm5hbWVzIjpbInVybCIsIlVSTCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImludml0ZUNvZGUiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJpbnZpdGVDb2RlRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5IiwicHJldmVudERlZmF1bHQiLCJzdWJtaXQiXSwic291cmNlUm9vdCI6IiJ9