$(document).ready(function () {
  $.ajax({
    url: "http://localhost/TRV/backend/tour/getAll",
    type: "GET",
    dataType: "json",
    success: function (tours) {
      try {
        console.log(tours);
        // Xử lý kết quả trả về từ REST API
        var tourListHtml = "";
        $.each(tours, function (index, tour) {
          tourListHtml =
            tourListHtml +
            `<figure>
				<a href="tour-detail?id=` +
            tour.TID +
            `"><img style="width: 100%; height: 220px;" src="image/tour` +
            tour.TID +
            `.jpg" alt='tourpic'></a>
				<figcaption><strong class='title'>&lt;` +
            tour.DayNum +
            ` NGÀY - ` +
            tour.TourName +
            `&gt; </strong>` +
            tour.TourDescription +
            `</figcaption>
				<div>
					<span class='price'>VND <strong>` +
            Number(tour.TourPrice).toLocaleString("en-US") +
            `</strong> / ` +
            tour.PeopleNum +
            ` NGƯỜI</span>
					<em class='sat'>CƠ HỘI TIẾT KIỆM ` +
            tour.Discount +
            `%</em>
				</div>
				<div class="type">
					` +
            tour.TourAddress +
            `
				</div>
			</figure>`;
        });
        $("#tour-list").html(tourListHtml);
      } catch (e) {
        console.log("Error parsing JSON response:", e);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
});
