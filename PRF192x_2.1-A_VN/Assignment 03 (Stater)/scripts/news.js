"use strict";
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
let totalResults = 0;
async function getDataNews(country, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${
        JSON.parse(getFromStorage("currentUser")).category
      }&pageSize=${Number.parseInt(
        JSON.parse(getFromStorage("currentUser")).pagesize
      )}&page=${page}&apiKey=806b49b44e7a4cd29be4e311f8a9c839`
    );
    const data = await res.json();
    console.log(data);
    displayNews(data);
  } catch (err) {
    {
      alert("Error: " + err.message);
    }
  }
}
getDataNews("us", 1);
function displayNews(data) {
  totalResults = data.totalResults;
  console.log(totalResults);
  checkPrevious();
  checkNext();
  let html = "";
  data.articles.forEach(function (article) {
    html += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src=${article.urlToImage} class="card-img"
                    alt="img">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href=${article.url}
                        class="btn btn-primary">View</a>
                </div>
            </div>
        </div>
    </div>
</div>`;
  });
  document.getElementById("news-container").innerHTML = html;
}
function checkPrevious() {
  if (pageNum.textContent == 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}
function checkNext() {
  if (pageNum.textContent == Math.ceil(totalResults / 10)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}
btnNext.addEventListener("click", function () {
  getDataNews("us", ++pageNum.textContent);
});
btnPrev.addEventListener("click", function () {
  getDataNews("us", --pageNum.textContent);
});
