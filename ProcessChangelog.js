$(document).ready(function() {
    // more/less links
    var more = $('span[data-term=more]').text();
    var less = $('span[data-term=less]').text();
    $('table.changelog tr').each(function() {
        $(this)
            .find('td:eq(4)')
                .addClass('details')
                .wrapInner('<span></span>')
                .find('span')
                    .after('<a href="#" class="toggle-more">'+more+' <small>&or;</small></a>');
    });
    // more/less functionality
    $('table.changelog th:eq(4)').css('width', '100px');
    $('table.changelog td.details a').toggle(function() {
        $(this)
            .html(less + ' <small>&and;</small>')
            .parents('tr:first')
                .addClass('open')
                .after('<tr class="more '+$(this).prev('span').find('.details').attr('class')+'"><td colspan="6"><div>'+$(this).prev('span').html()+'</div></td></tr>');
        return false;
    }, function() {
        $(this)
            .html(more + ' <small>&or;</small>')
            .parents('tr:first')
                .removeClass('open')
                .next('tr.more')
                    .remove();
        return false;
    });
    // remove link
    var are_you_sure = $('span[data-term=are_you_sure]').text();
    var remove_failed = $('span[data-term=remove_failed]').text();
    $('table.changelog a.remove').live('click', function() {
        if (confirm(are_you_sure)) {
            var $link = $(this);
            $.get($(this).attr('href'), function(data) {
                data = $.parseJSON(data);
                if (data && !data.error) {
                    $($link).parents('tr:first').fadeOut('500');
                } else {
                    alert(remove_failed);
                }
            });
        }
        return false;
    });
    // hide extra info when ordering data
    $('table.changelog th.header').click(function() {
        $('table.changelog tr.open a.toggle-more').click();
    });
    // when data is filtered by id and only one row exists, show info by default
    var getp = window.location.search.replace("?", "");
    if (getp.substr(0,3) == "id=" && $('a.toggle-more').length == 1) {
        $('a.toggle-more').click();
    }
    // filter form autosubmit
    $('form#filters select, form#filters input').change(function() {
        this.form.submit();
    });
    // hide nonrelevant options in filter form
    if ($('form#filters select[name=when] option[selected]').attr('value') != "between") {
        $('form#filters .changelog-datepicker')
            .addClass('disabled')
            .attr('title', $('form#filters input[name=date_from]').attr('data-disabled-title'))
            .attr('disabled', 'disabled');
    }
    // datepicker
    $('.changelog-datepicker').each(function() {
        var options = {
            dateFormat: $(this).attr('data-dateformat'),
            minDate: $(this).attr('data-mindate'),
            maxDate: $(this).attr('data-maxdate')
        };
        $(this).datepicker(options);
    });
});
