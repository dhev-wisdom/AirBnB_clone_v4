/* global $ */

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
});
