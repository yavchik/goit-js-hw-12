import{i as l,S as c}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function u(s){const o="https://pixabay.com",r="/api/",i=new URLSearchParams({key:"44562390-aecbf7bf64fbbf331d9c706fa",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}),e=`${o}${r}?${i}`;return fetch(e).then(t=>t.json()).catch(t=>console.log(t))}function d(s){const o=s.map(r=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r.largeImageURL}">
          <img
            width="360"
            height="200"
            class="gallery-image"
            src="${r.webformatURL}"
            alt="${r.tags}" />
          <div class="image-info">
            <p>Likes ${r.likes}</p>
            <p>Views ${r.views}</p>
            <p>Comments ${r.comments}</p>
            <p>Downloads ${r.downloads}</p>
          </div>
        </a>
      </li>`).join("");n.imgGallery.innerHTML=o}const n={formEl:document.querySelector(".search-form"),imgGallery:document.querySelector(".gallery"),loaderEl:document.querySelector(".loader")};n.formEl.addEventListener("submit",s=>{s.preventDefault();const o=s.target.elements.query.value.trim();if(o===""){n.imgGallery.innerHTML="",l.warning({title:"Warning",message:"Please, enter the query",layout:2,displayMode:"once",backgroundColor:"#ef4040",position:"topRight"});return}n.imgGallery.innerHTML="",m(),u(o).then(r=>{if(r.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",layout:2,displayMode:"once",backgroundColor:"#ef4040",progressBarColor:"#B51B1B",position:"topRight"});return}d(r.hits),f.refresh(),n.formEl.reset()}).catch(r=>{console.error("Error fetching images:",r),l.error({title:"Error",message:"Something went wrong. Please try again later.",layout:2,displayMode:"once",backgroundColor:"#ef4040",position:"topRight"})}).finally(()=>{p()})});let f=new c(".gallery a",{captionsData:"alt",captionDelay:250});function m(){n.loaderEl.classList.remove("hidden")}function p(){n.loaderEl.classList.add("hidden")}
//# sourceMappingURL=commonHelpers.js.map
