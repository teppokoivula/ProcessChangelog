$(document).ready(function() {
    // translations etc. are defined in ProcessChangelog.module
    var moduleConfig = config.ProcessChangelog;
    // more/less links
    $('table.changelog tr').each(function() {
        $(this)
            .find('td:eq(4)')
                .addClass('details')
                .wrapInner('<span class="hidden"></span>')
                .find('span')
                    .after('<a href="#" class="toggle-more">'+moduleConfig.i18n.more+' <small>&or;</small></a>');
    });
    // more/less functionality
    $('table.changelog th:eq(4)').css('width', '100px');
    $('table.changelog td.details a').toggle(function() {
        $(this)
            .html(moduleConfig.i18n.less + ' <small>&and;</small>')
            .parents('tr:first')
                .addClass('open')
                .after('<tr class="more '+$(this).prev('span.hidden').find('.details').attr('class')+'"><td colspan="6"><div>'+$(this).prev('span.hidden').html()+'</div></td></tr>');
        return false;
    }, function() {
        $(this)
            .html(moduleConfig.i18n.more + ' <small>&or;</small>')
            .parents('tr:first')
                .removeClass('open')
                .next('tr.more')
                    .remove();
        return false;
    });
    // remove link
    $('table.changelog').delegate('a.remove', 'click', function() {
        if (confirm(moduleConfig.i18n.areYouSure)) {
            var $link = $(this);
            $.get($(this).attr('href'), function(data) {
                data = $.parseJSON(data);
                if (data && !data.error) {
                    $($link).parents('tr:first').fadeOut('500');
                } else {
                    alert(moduleConfig.i18n.removeFailed);
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
    var $when = $('form#filters select[name=when]');
    if ($when.length && $when.attr('value') != "between") {
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
