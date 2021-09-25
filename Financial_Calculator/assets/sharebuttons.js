const watsappBtn = document.querySelector(".watsapp-btn");
const facebookBtn= document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const linkedinBtn = document.querySelector(".linkedin-btn");
 function init(){
  let postUrl=encodeURI(document.location.href);
  let postTitle=encodeURI("Financial Calculators");

  watsappBtn.setAttribute("href",`https://api.whatsapp.com/send?text=${postTitle} ${postUrl}
  `);
  // facebookBtn.setAttribute("href",`https://www.facebook.com/sharer.php?u=${postUrl} & text=${postTitle}
  // `);
  facebookBtn.setAttribute("href",`https://www.facebook.com/sharer/sharer.php?u=${postUrl}&text=${postTitle}
  `);
  twitterBtn.setAttribute("href",`https://twitter.com/share?url=${postUrl}&text=${postTitle}
  `);
  linkedinBtn.setAttribute("href",`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&text=${postTitle}
  `);
 }
 init();
var button = document.getElementById("copyID"),
 input = document.getElementById("content");

button.addEventListener("click", function(event) {
 event.preventDefault();
 input.select();
 document.execCommand("copy");
});
!function(a){var b="embedly-platform",c="script";if(!a.getElementById(b)){var d=a.createElement(c);d.id=b,d.src=("https:"===document.location.protocol?"https":"http")+"://cdn.embedly.com/widgets/platform.js";var e=document.getElementsByTagName(c)[0];e.parentNode.insertBefore(d,e)}}(document);
$('a.embed').on('click', function(){
  embedly.modal(); 
  return false;
});