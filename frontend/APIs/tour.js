var tour_list;

function searchAddress() {
  var search_key = $("#inp").val();
  if (search_key != "") {
    var tourListHtml = "";
    $.each(tour_list, function (index, tour) {
      if (tour.TourAddress.toLowerCase().includes(search_key.toLowerCase())) {
        console.log(tour);
        tourListHtml =
          tourListHtml +
          `<figure>
				<a href="rating.html?id=` +
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
      }
    });
    $("#tour-list").html(tourListHtml);
  }
}

$(document).ready(function () {
  $.ajax({
    url: "http://localhost/TRV/backend/tour/getAll",
    type: "GET",
    dataType: "json",
    success: function (tours) {
      try {
        // Xử lý kết quả trả về từ REST API
        var tourListHtml = "";
        tour_list = tours;
        $.each(tours, function (index, tour) {
          tourListHtml =
            tourListHtml +
            `<figure>
				<a href="rating.html?id=` +
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
