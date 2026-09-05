// =========================================================
// FAQ PAGE — accordion toggle
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

    var faqList = document.getElementById('faqList');
    if (!faqList) return;

    faqList.querySelectorAll('.faq-item').forEach(function (item) {
        var question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            var isOpen = item.classList.contains('is-open');

            // Close any other open item (accordion behaviour)
            faqList.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
                if (openItem !== item) openItem.classList.remove('is-open');
            });

            item.classList.toggle('is-open', !isOpen);
        });
    });

});
