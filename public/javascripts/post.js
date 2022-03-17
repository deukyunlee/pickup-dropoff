const main = {
  init: function () {
    const _this = this;
    document.getElementById("write").onclick = function () {
      _this.write();
    };
  },
  write: function () {
    const post = {
      name: document.getElementById("name").value,
      class: document.getElementById("class").value,
      car: document.getElementById("car").value,
      createdDate: new Date().toLocaleString(),
      modifiedDate: new Date().toLocaleString(),
    };
    axios.post("/board/post", post).then(function (result) {
      if (
        result.data &&
        post.name &&
        post.class != "select" &&
        post.car != "select"
      ) {
        location.href = "/board";
      } else {
        alert("데이터를 입력하지 않았거나 오류가 있습니다.");
      }
    });
  },
};

main.init();
