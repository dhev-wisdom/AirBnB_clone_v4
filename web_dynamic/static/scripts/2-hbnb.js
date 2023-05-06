$(document).ready(function () {
  let checkedBoxList = {};
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
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'OK') {
      const api_status = $('div#api_status');
      api_status.addClass('available');
    } else {
      api_status.removeClass('available');
    }
  });
});
