$(document).ready(function() {
    
    var initLog = function() {
        
        var $table = $('table.log');
        var $filters = $('form#filters');
        
        // more/less links
        $table.find('> tbody > tr').each(function() {
            $(this)
                .find('> td:last-child')
                .wrapInner('<span hidden></span>')
                .append('<a class="more">'+config.log.i18n.more+'</a>');
        });
        
        // more/less functionality
        $table.on('click', 'a.more', function() {
            var $tr = $(this).parents('tr:first').toggleClass('open');
            $(this).text(config.log.i18n[$tr.hasClass('open') ? 'less' : 'more']);
            if ($tr.hasClass('open')) {
                var colspan = $tr.find('> td').length;
                var details = $(this).prev('[hidden]').html();
                $tr.after('<tr class="more"><td colspan="' + colspan + '"><div>' + details + '</div></td></tr>');
            } else {
                $tr.next('tr.more').remove();
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
        if ($when.length && $when.attr('value') != "between") {
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
    var updateXHR;
    var updateContent = function(params) {
        var $spinner = $('#info h2 i.fa-spinner');
        if (!$spinner.length || $spinner.data('params') != params) {
            if ($spinner.length && updateXHR) updateXHR.abort();
            $spinner = $('<i class="fa fa-spinner fa-spin"></i>').data('params', params);
            $('#info h2').append($spinner);
            history.replaceState(null, null, params);
            var updateXHR = $.ajax({
                url: params,
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                },
                success: function(data, textStatus) {
                    $('#info').parent().html(data);
                },
                complete: function(xhr, textStatus) {
                    initLog();
                }
            });
        }
    }

    // init
    initLog();
    
});
