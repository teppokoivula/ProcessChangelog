$(document).ready(function() {

    var initLog = function() {

        var $table = $('table.log');
        var $filters = $('form#filters');

        // more/less links
        $table.find('> tbody > tr').each(function() {
            $(this)
                .find('> td:last-child')
                .wrapInner('<span hidden></span>')
                .append('<a class="more" tabindex="0"><span class="text">' + config.log.i18n.more + '</span><i class="icon" aria-hidden="true"></i></a>');
        });

        // more/less functionality
        $table.on('click keyup', 'a.more', function(e) {
            if (e.type == 'click' || e.type == 'keyup' && (e.keyCode == 32 || e.keyCode == 40 || e.keyCode == 38|| e.keyCode == 13)) {
                e.preventDefault();
                var $tr = $(this).parents('tr:first').toggleClass('open');
                $(this).children('.text:first').text(config.log.i18n[$tr.hasClass('open') ? 'less' : 'more']);
                if ($tr.hasClass('open') || e.type == 'keyup' && e.keyCode == 38) {
                    var colspan = $tr.find('> td').length;
                    var details = $(this).prev('[hidden]').html();
                    $tr.after('<tr class="more"><td colspan="' + colspan + '">' + details + '</td></tr>');
                    $tr.next('tr.more').find('.details:first').focus();
                } else {
                    $tr.next('tr.more').remove();
                }
            }
        });

        // remove link
        $table.on('click', 'a.remove-row', function() {
            if (confirm(config.log.i18n.areYouSure)) {
                var $link = $(this);
                $.get($link.attr('href'), function(data) {
                    data = $.parseJSON(data);
                    if (data && !data.error) {
                        $link.parents('tr:first').fadeOut('500');
                    } else {
                        alert(config.log.i18n.removeFailed);
                    }
                });
            }
            return false;
        });

        // hide extra info when ordering data
        $table.on('click', 'th.tablesorter-header', function() {
            $table.find('tr.open a.more').trigger('click');
        });

        // when data is filtered by id and only one row exists, show info by default
        if ($table.find('a.more').length == 1 && window.location.search.match(/[?&]id=/)) {
            $table.find('a.more').trigger('click');
        }

        // display JS-only icons
        $('.js-icon').addClass('icon').removeClass('js-icon');

        // AJAX filter form
        $filters.on('change', 'select, input', function() {
            updateContent('?' + $filters.serialize());
        });

        // AJAX links
        $table.parent().off('click.ajax').on('click.ajax', 'a.ajax', function(event) {
            event.preventDefault();
            updateContent($(this).attr('href'));
        });

        // AJAX pagination
        $('.MarkupPagerNavCustom').on('click', 'a', function(event) {
            event.preventDefault();
            var params = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $('#info').offset().top
            }, 500, function() {
                updateContent(params);
            });
        });

        // hide irrelevant options in filter form
        var $when = $filters.find('select[name=when]');
        if ($when.length && $when.prop('value') != "between") {
            $filters.find('.log-datepicker')
                .parent('div')
                    .addClass('disabled')
                    .end()
                .attr('title', $filters.find('input[name=date_from]').attr('data-disabled-title'))
                .attr('disabled', 'disabled');
        }

        // init datepicker
        $('.log-datepicker').each(function() {
            var options = {
                dateFormat: $(this).attr('data-dateformat'),
                minDate: $(this).attr('data-mindate'),
                maxDate: $(this).attr('data-maxdate')
            };
            $(this).datepicker(options);
        });

        // layout fix for filter fieldset label (required when content is updated via AJAX)
        $(".Inputfield:not(.collapsed9) > .InputfieldHeader").addClass("InputfieldStateToggle");

    }

    // update content via AJAX
    var $contentContainer = $('#info').parent();
    var isUikit = $contentContainer.find('.uk-select:first').length > 0;
    var updateXHR;
    var updateContent = function(params) {
        var $spinner = $('#info h2 i.fa-spinner');
        if (!$spinner.length || $spinner.data('params') != params) {
            if ($spinner.length && updateXHR) {
                updateXHR.abort();
            }
            $spinner = $('<i class="fa fa-spinner fa-spin"></i>').data('params', params);
            $('#info h2').append($spinner);
            history.replaceState(null, null, params);
            updateXHR = $.ajax({
                url: params,
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                },
                success: function(data, textStatus) {
                    $contentContainer.html(data);
                    if (isUikit) {
                        $contentContainer.find('select').addClass('uk-select');
                    }
                },
                complete: function(xhr, textStatus) {
                    initLog();
                    if (typeof AdminDataTable !== 'undefined') {
                        AdminDataTable.init();
                    }
                }
            });
        }
    }

    // init
    initLog();

});
