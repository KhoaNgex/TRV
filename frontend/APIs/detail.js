const params = new URLSearchParams(window.location.search);
const id = params.get("id");
var average_rating;

function postReview() {
  var FormData = {
    UID: 3,
    TID: Number(id),
    Content: $("#comment-content").val(),
    Point: $("#point").val(),
  };
  $.ajax({
    url: "http://localhost/TRV/backend/survey/createItem",
    type: "POST",
    data: JSON.stringify(FormData),
    contentType: "application/json",
    success: function (result) {
      alert("Đăng tải bình luận thành công!");
      window.location.href = "rating.html?id=" + FormData.TID;
    },
    error: function (xhr, status, error) {
      alert("Đăng tải bình luận thất bại!");
    },
  });
}

$(document).ready(function () {
  $.ajax({
    url: "http://localhost/TRV/backend/tour/getItem/" + id,
    type: "GET",
    dataType: "json",
    success: function (items) {
      try {
        // Xử lý kết quả trả về từ REST API
        var itemHtml = "";
        var item = items[0];
        var avg_rating = "";

        $.ajax({
          url: "http://localhost/TRV/backend/tour/getRating/" + id,
          type: "GET",
          dataType: "json",
          async: false,
          success: function (rating) {
            try {
              average_rating = rating[0]["avg_rating"];
              console.log(average_rating);
            } catch (e) {
              console.log("Error parsing JSON response:", e);
            }
          },
          error: function (xhr, status, error) {
            console.log("Error:", error);
          },
        });

        itemHtml =
          itemHtml +
          `<div class="TourName">
				<p>` +
          item.TourName +
          `</p>
			</div>
            <div class="TourRating" style="color: orange;">` +
          average_rating +
          `/5.0</div>
			<div class="TourRating">
				<p>` +
          item.TourAddress +
          `</p>
			</div>
			<div>
                <p class="tourDesc1">
                ` +
          item.TourDescription +
          `
                </p>
				<p class="tourDesc2">
                    Với vị trí đắc địa bên bờ biển, Vũng Tàu được biết đến là một điểm du lịch nổi tiếng, hấp dẫn du khách bởi cảnh quan thiên nhiên tuyệt đẹp và các hoạt động giải trí thú vị.
				</p>
			</div>
            <div class="rating-btn" style="margin-top: 30px;">
				<button type="button" class="rating-btn">Liên hệ</button>
			</div>
			`;
        $("#tourinfo").html(itemHtml);
      } catch (e) {
        console.log("Error parsing JSON response:", e);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });

  $.ajax({
    url: "http://localhost/TRV/backend/tour/getSurvey/" + id,
    type: "GET",
    dataType: "json",
    success: function (items) {
      try {
        // Xử lý kết quả trả về từ REST API
        var itemHtml = "";
        $.each(items, function (index, item) {
          itemHtml += `<li class="comment">
				<div class="infoname">
					<div class="avatar">
						<img src="image/avatar.png" alt="" class="avatar">
					</div>
					<div class="comment-author">
						<div class="comment-author"> `+item.UserName+`</div>
					</div>
				</div>
				<div class="comment-content">`+item.Content+`</div>
			</li>`;
        });

        $("#comment-list").html(itemHtml);
      } catch (e) {
        console.log("Error parsing JSON response:", e);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
});
