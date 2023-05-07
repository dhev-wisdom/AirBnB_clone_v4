$(document).ready(function () {
  const checkedBoxList = {};
  $('input[type:checkbox]').on('change', function () {
    // const amenityID = $(this).data('id');
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkedBoxList[amenityId] = amenityName;
    } else {
      delete checkedBoxList[amenityId];
    }

    const h4Tag = $('div > h4');
    const selectedAmenities = Object.values(checkedBoxList).join(', ');
    h4Tag.text(selectedAmenities);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    const apiStatus = $('div#api_status');
    if (textStatus === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });
});
