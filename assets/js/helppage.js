function expandContainers(elem, recursive) {
    elem.find('a.type-details').each(function () {
        var $this = $(this);
        if (!$this.hasClass("out")) {
            var cTr = $this.closest('tr');
            var tId = $this.attr('href');
            var table = $("<table class=\"table\"></table>");
            var nTr = $("<tr class=\"details\"><td colspan=2></td></tr>");
            cTr.after(nTr);
            table.appendTo(nTr.children("td"));
            var copy = $(tId + " tr").clone();
            copy.appendTo(table);
            if (recursive) {
                expandContainers(copy);
            }
        }
    });
}

$(document).on('scroll', function () {
    if ($(window).scrollTop() > 100) {
        $('.scroll-top-wrapper').addClass('show');
    } else {
        $('.scroll-top-wrapper').removeClass('show');
    }
});

$(document).keydown(function (e) {
    if (e.keyCode === 70 && (e.ctrlKey || e.metaKey)) {
        // ctrl+f to support browser search on container contents
        expandContainers($("body"), true);
    }
});

$("#content").on('click', 'a.type-details', function (e) {
    e.preventDefault();
    if ($(this).hasClass("out")) {
        $(this).closest('tr').nextAll('tr.details').remove();
    } else {
        expandContainers($(this).parent());
    }
    $(this).toggleClass("in out");
});

$("a[href*=#]").click(function (e) {
    var id = $(this).attr('href') + '';
    if ($(this).data('toggle') === "tab") {
        $(this).tab('show');
    } else {
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 750, 'swing');
    }
});

$(function () {
    $(".lang-sequence, .language-sequence").unwrap("pre").removeClass("lang-sequence").removeClass("language-sequence").css('background', 'none').sequenceDiagram({ theme: 'simple' });
    $('.prettyprint, code[class^=lang-], code[class^=language-]').each(function (i, block) { hljs.highlightBlock(block); });
});
