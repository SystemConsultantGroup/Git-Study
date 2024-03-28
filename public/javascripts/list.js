const keyword = document.querySelector("#keyword"),
      keyword_btn = document.querySelector("#keyword-btn");

keyword_btn.addEventListener("click", searchKeyword);

function postLike(idx) {
  const url = "/article/like/" + idx;
  fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      }
  })
  .then((res) => res.json())
  .then((res) => {
      if(res.success) {
          document.body.innerHTML = res.result
      } else {
          alert(res.msg);
      }
  })
  .catch((err) => {
      console.error('Error Occur!')
  });  
}

function searchKeyword() {
  fetch("/article" + new URLSearchParams({
    content: keyword.value
  }));
}