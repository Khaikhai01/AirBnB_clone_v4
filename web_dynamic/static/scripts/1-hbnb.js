$(function () {
  let checkedBox = [];
  let checkedString = '';

  $('input[type="checkbox"]').on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checkedBox')) {
      checkedBox.push({ id: id, name: name });
    } else {
      checkedBox = $.grep(checkedBox, (item) => {
        return item.id != id;
      });
    }

    checkedString = checkedBox.map(function (item) {
      return item.name;
    }).join(', ');
    $('div.amenities h4').text(checkedString);
  });
});