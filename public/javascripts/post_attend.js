const main = {
  init: function () {
    const _this = this;
    document.getElementById("write").onclick = function () {
      _this.write();
    };
  },
  write: function () {
    count = document.getElementById("count").value;
    // console.log(count);
    // for (i = 0; i < 20; i++)
    //   post[i] = {
    //     select: document.getElementsByClassName("hi")[i].value,
    //     count: document.getElementById("count").value,
    //   };
    post = Array();

    count = parseInt(count);

    for (i = 0; i < count; i++)
      post[i] = {
        select: document.getElementsByClassName("hi")[i].value,
        count: document.getElementById("count").value,
        name: document.getElementsByClassName("name")[i].value,
      };
    axios.post("/board/form", post).then(function (result) {
      if (result.data) {
        location.href = "/board";
      } else {
        alert("데이터를 입력하지 않았거나 오류가 있습니다.");
      }
    });
  },
};

main.init();
