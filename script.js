window.onscroll = function() {
  requestAnimationFrame(myFunction);
};

function myFunction() {
  var winScroll = window.scrollY || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  if (height === 0) return;

  var scrolled = (winScroll / height) * 100;

  scrolled = Math.min(Math.max(scrolled, 0), 100);

  var progressBar = document.getElementById("myBar");
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
}
