# Custom code du site Blinked AVANT migration (Site settings, relevé MCP du 2026-11-17)

## HEAD

```html
<!--🤙 https://slater.app/18716.js-->
<script>document.addEventListener("DOMContentLoaded", function() {function loadblinked(e){let t=document.createElement("script");t.setAttribute("src",e),t.setAttribute("type","module"),document.body.appendChild(t),t.addEventListener("load",()=>{console.log("Slater loaded Blinked.js: https://slater.app/18716.js 🤙")}),t.addEventListener("error",e=>{console.log("Error loading file",e)})}let src=window.location.host.includes("webflow.io")?"https://slater.app/18716.js":"https://assets.slater.app/slater/18716.js?v=1.0";loadblinked(src);})</script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"
/>

<script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"></script>

<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-list
></script>

<script src="
https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js
"></script>
<link href="
https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.css
" rel="stylesheet">

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3HKFGT9CSQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3HKFGT9CSQ');
</script>
```

## FOOTER

```html
<script>
window.axeptioSettings = {
  clientId: "699dc27599e73ff3dd00fa27",
  cookiesVersion: "59dc1998-5af7-4a16-8776-5d90e80892d3",
  googleConsentMode: {
    default: {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500
    }
  }
};
 
(function(d, s) {
  var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
  e.async = true; e.src = "//static.axept.io/sdk.js";
  t.parentNode.insertBefore(e, t);
})(document, "script");
</script>
```
