$(document).ready(function () {
  $.ajax({
    url: "http://localhost/TRV/backend/tour/getAddress",
    type: "GET",
    dataType: "json",
    success: function (tours) {
      try {
        // Xử lý kết quả trả về từ REST API
        var tourListImgHtml = "";
        var count = 0;
        $.each(tours, function (index, tour) {
          count += 1;
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
        $("#image-list").html(tourListImgHtml);
      } catch (e) {
        console.log("Error parsing JSON response:", e);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
    },
  });
});
