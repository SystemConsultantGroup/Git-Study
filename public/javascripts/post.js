const author = document.querySelector("#author"),
content = document.querySelector("#content"),
post_btn = document.querySelector("#post-btn");

post_btn.addEventListener("click", postArticle);

function postArticle() {
    const req = {
        author: author.value,
        content: content.value,
    }
    if(!req.author || !req.content) {
        alert("작성자와 내용을 다 기입해주세요!");
    }
    else{
        const url = "/article/post"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
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
}
