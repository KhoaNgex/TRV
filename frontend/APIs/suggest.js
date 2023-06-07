function renderTour(tours) {
  try {
    // Xử lý kết quả trả về từ REST API
    var tourSaleHtml = "";
    var tourHotHtml = "";
    $.each(tours, function (index, tour) {
      if (tour.isSale) {
        tourSaleHtml =
          tourSaleHtml +
          `<figure class="content">
					<img style="width: 42%; height: 100%;" src="image/tour` +
          tour.TID +
          `.jpg" />
					<figcaption>
						<header>
							<hgroup>
								<h2>` +
          tour.TourName +
          `</h2> <h3 class="day-num">` +
          tour.DayNum +
          ` NGÀY</h3> 
								<h3>` +
          tour.TourDescription +
          `</h3>
							</hgroup>
						</header>
						<div class="buy">
							<div class="price"><strong>` +
          Number(
            tour.TourPrice * (1 - Number(tour.Discount) / 100)
          ).toLocaleString("en-US") +
          `</strong> VNĐ</div>
                            <s>` +
          Number(tour.TourPrice).toLocaleString("en-US") +
          ` VNĐ</s>
							<div class="now"><a href='rating.html?id=`+tour.TID+`'>CHI TIẾT</a></div>
						</div>
						<div class="type">` +
          tour.TourAddress +
          `</div>
						<div class="desc">4.7/5</div>
						<footer>
							THỜI HẠN HẾT NGÀY <time>` +
          tour.expireDay +
          `</time>
						</footer>
					</figcaption>
				</figure>`;
      }

      if (tour.isHot) {
        tour.expireDay = tour.isSale
          ? tour.expireDay
          : "Chưa áp dụng khuyến mãi";
        tour.TourPrice = tour.isSale
          ? tour.TourPrice * (1 - Number(tour.Discount) / 100)
          : tour.TourPrice;
        tourHotHtml =
          tourHotHtml +
          `<figure class="content">
					<img style="width: 42%; height: 100%;" src="image/tour` +
          tour.TID +
          `.jpg" />
					<figcaption>
						<header>
							<hgroup>
								<h2>` +
          tour.TourName +
          `</h2> <h3 class="day-num">` +
          tour.DayNum +
          ` NGÀY</h3> 
								<h3>` +
          tour.TourDescription +
          `</h3>
							</hgroup>
						</header>
						<div class="buy">
							<div class="price"><strong>` +
          Number(tour.TourPrice).toLocaleString("en-US") +
          `</strong> VNĐ</div>
                            <s>` +
          Number(tour.TourPrice).toLocaleString("en-US") +
          ` VNĐ</s>
							<div class="now"><a href='rating.html?id=`+tour.TID+`'>CHI TIẾT</a></div>
						</div>
						<div class="type">` +
          tour.TourAddress +
          `</div>
						<div class="desc">4.7/5</div>
						<footer>
							THỜI HẠN HẾT NGÀY <time>` +
          tour.expireDay +
          `</time>
						</footer>
					</figcaption>
				</figure>`;
      }
    });
    $("#tour-sale").html(tourSaleHtml);
    $("#tour-hot").html(tourHotHtml);
  } catch (e) {
    console.log("Error parsing JSON response:", e);
  }
}

$(document).ready(function () {
  $.ajax({
    url: "http://localhost/TRV/backend/tour/getAll",
    type: "GET",
    dataType: "json",
    success: function (tours) {
      renderTour(tours);
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });

  $.ajax({
    url: "http://localhost/TRV/backend/tour/getAddress",
    type: "GET",
    dataType: "json",
    success: function (tours) {
      try {
        // Xử lý kết quả trả về từ REST API
        var tourListHtml = "";
        var tourListImgHtml = "";
        var count = 0;
        $.each(tours, function (index, tour) {
          count += 1;
          tourListHtml =
            tourListHtml +
            `	<li><button class="tag-btn">` +
            tour.TourAddress +
            `</button></li>`;
          tourListImgHtml =
            tourListImgHtml +
            `
              <figure>
                <img src="image/sidebar` +
            count +
            `.jpg" />
                <figcaption>` +
            tour.TourAddress +
            `</figcaption>
              </figure>`;
        });
        $("#address-list").html(tourListHtml);
        $("#image-list").html(tourListImgHtml);
        $(".tag-btn").click(function (e) {
          e.preventDefault();
          var content = $(this).text();
          var FormData = {
            TourAddress: content,
          };
          $.ajax({
            url: "http://localhost/TRV/backend/tour/filterItem",
            type: "POST",
            data: JSON.stringify(FormData),
            contentType: "application/json",
            success: function (tours) {
              renderTour(tours);
            },
            error: function (xhr, status, error) {
              alert("Hiện chưa có tour du lịch ở địa điểm này!");
            },
          });
        });
      } catch (e) {
        console.log("Error parsing JSON response:", e);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });

  $("#hot-tab").click(function () {
    document
      .getElementById("sale-tab-container")
      .setAttribute("style", "background-color: #eee;  border-top: none;");
    document
      .getElementById("hot-tab-container")
      .setAttribute(
        "style",
        "background-color: #fff; border-top: 2px solid #458b00;"
      );
    $("#tour-sale").css("display", "none");
    $("#tour-hot").css("display", "block");
  });

  $("#sale-tab").click(function () {
    document
      .getElementById("hot-tab-container")
      .setAttribute("style", "background-color: #eee;  border-top: none;");
    document
      .getElementById("sale-tab-container")
      .setAttribute(
        "style",
        "background-color: #fff; border-top: 2px solid #458b00;"
      );
    $("#tour-sale").css("display", "block");
    $("#tour-hot").css("display", "none");
  });
});
