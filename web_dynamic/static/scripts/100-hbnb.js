/* global $ */

$(document).ready(function () {
  const checkedBoxList = {};
  const checkedStates = {};
  const checkedCities = {};

  $('.locations > ul > h2 > input[type="checkbox"]').change(function () {
    const stateId = $(this).attr('data-id');
    const stateName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkedStates[stateId] = stateName;
    } else {
      delete checkedStates[stateId];
    }

    updateResult();
  }

  $('.locations > ul > ul > li > input[type="checkbox"]').change(function () {
    const cityId = $(this).attr('data-id');
    const cityName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkedCities[cityId] = cityName;
    } else {
      delete checkedCities[cityId];
    }

    updateResult();
  }

  $('.amenities > input[type:checkbox]').on('change', function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      checkedBoxList[amenityId] = amenityName;
    } else {
      delete checkedBoxList[amenityId];
    }

    const h4Tag = $('div > h4');
    if (Object.values(checkedBoxList).length === 0) {
      h4Tag.html('&nbsp;');
    } else {
      const selectedAmenities = Object.values(checkedBoxList).join(', ');
      h4Tag.text(selectedAmenities);
    }
  });

  function updateResult () {
    const locations = Object.assign({}, checkedStates, checkedCities);
    if (Object.values(locations).length === 0) {
      $('.locations H4').html('&nbsp;');
    } else {
      $('.locations H4').text(Object.values(locations).join(', '));
    }
  }

  $.get('http://0.0.0.0:5001/api/v1/places_search/', function (data, textStatus) {
    const apiStatus = $('div#api_status');
    if (textStatus === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: {},
    contentType: 'application/json',
    dataType: 'json',
    success: articleCreatePlaces
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(checkedBoxList),
        states: Object.keys(checkedStates),
        cities: Object.keys(checkedCities),
      }),
      dataType: 'json',
      success: articleCreatePlaces
    });
  });

  function articleCreatePlaces (data) {
    const placeSection = $('section.places');
    for (const place of data) {
      const article = $('<article></article>');
      const titleDiv = $('<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div>');
      const informationDiv = $('<div class="information"><div class="max_guest"><I class="fa fa-users fa-3x" aria-hidden="true"></I><br>' +
                               place.max_guest + ' Guests</div><div class="number_rooms">' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms">' +
                               '<I class="fa fa-bath fa-3x" aria-hidden="true"></I><br>' + place.number_bathrooms + ' Bathrooms</div></div>');
      const descriptionDiv = $('<div class="description">' + place.description + '</div>');
      article.append(titleDiv);
      article.append(informationDiv);
      article.append(descriptionDiv);
      placeSection.append(article);
    }
  }
});
