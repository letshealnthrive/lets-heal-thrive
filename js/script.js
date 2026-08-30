// =========================================================
// LET'S HEAL & THRIVE — SITE SCRIPT
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

    /* =====================================================
       MOBILE NAV
    ===================================================== */

    var menuToggle = document.getElementById('menuToggle');
    var navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {

        menuToggle.addEventListener('click', function () {
            var isOpen = navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuToggle.innerHTML = isOpen
                ? '<i class="fas fa-xmark"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

    }

    /* =====================================================
       ANNOUNCEMENT BAR DISMISS
    ===================================================== */

    var announceBar = document.getElementById('announceBar');
    var announceClose = document.getElementById('announceClose');

    if (announceBar && announceClose) {
        try {
            if (sessionStorage.getItem('lht_announce_dismissed') === '1') {
                announceBar.classList.add('is-hidden');
            }
        } catch (err) { /* sessionStorage unavailable — ignore */ }

        announceClose.addEventListener('click', function () {
            announceBar.classList.add('is-hidden');
            try { sessionStorage.setItem('lht_announce_dismissed', '1'); } catch (err) {}
        });
    }


    var header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.style.boxShadow = window.scrollY > 12
                ? '0 8px 24px rgba(52, 73, 54, 0.08)'
                : 'none';
        });
    }


    /* =====================================================
       GENERIC MODAL OPEN / CLOSE
    ===================================================== */

    var openModals = [];

    function openModal(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.classList.add('active');
        el.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        openModals.push(id);
    }

    function closeModal(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('active');
        el.setAttribute('aria-hidden', 'true');
        openModals = openModals.filter(function (m) { return m !== id; });
        if (openModals.length === 0) {
            document.body.classList.remove('modal-open');
        }
    }

    document.querySelectorAll('.js-close-modal').forEach(function (btn) {
        btn.addEventListener('click', function () {
            closeModal(btn.getAttribute('data-target'));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal(overlay.id);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && openModals.length) {
            closeModal(openModals[openModals.length - 1]);
        }
    });


    /* =====================================================
       BOOKING MODAL TRIGGERS
    ===================================================== */

    document.querySelectorAll('.js-open-booking').forEach(function (btn) {
        btn.addEventListener('click', function () {
            resetBookingForm();
            openModal('bookingModal');
        });
    });


    /* =====================================================
       SERVICE "LEARN MORE" MODALS
    ===================================================== */

    document.querySelectorAll('.js-open-service').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var key = btn.getAttribute('data-service');
            var data = SERVICES[key];
            if (!data) return;

            var body = document.getElementById('infoModalBody');
            body.innerHTML =
                '<span class="section-label">' + data.eyebrow + '</span>' +
                '<h3 class="modal-title">' + data.title + '</h3>' +
                '<p class="modal-lead">' + data.intro + '</p>' +
                '<h5 class="modal-subhead">This may be for you if&hellip;</h5>' +
                '<ul class="modal-list">' +
                    data.signs.map(function (s) { return '<li><i class="fas fa-check"></i>' + s + '</li>'; }).join('') +
                '</ul>' +
                '<h5 class="modal-subhead">What to expect</h5>' +
                '<ul class="modal-list">' +
                    data.expect.map(function (s) { return '<li><i class="fas fa-check"></i>' + s + '</li>'; }).join('') +
                '</ul>' +
                '<button type="button" class="btn btn-primary modal-cta js-open-booking">Book a Consultation</button>';

            // Re-bind the CTA that was just injected
            body.querySelector('.js-open-booking').addEventListener('click', function () {
                closeModal('infoModal');
                resetBookingForm();
                openModal('bookingModal');
            });

            openModal('infoModal');
        });
    });


    /* =====================================================
       LEGAL PAGE MODALS (Terms / Privacy / Cancellation)
    ===================================================== */

    document.querySelectorAll('.js-open-legal').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var key = btn.getAttribute('data-legal');
            var data = LEGAL_PAGES[key];
            if (!data) return;

            var body = document.getElementById('infoModalBody');
            body.innerHTML =
                '<span class="section-label">LEGAL</span>' +
                '<h3 class="modal-title">' + data.title + '</h3>' +
                '<div class="modal-legal-text">' + data.html + '</div>';

            openModal('infoModal');
        });
    });


    /* =====================================================
       SELF-ASSESSMENT QUIZ ENGINE
    ===================================================== */

    document.querySelectorAll('.js-open-quiz').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var key = btn.getAttribute('data-quiz');
            startQuiz(key);
            openModal('quizModal');
        });
    });

    function startQuiz(key) {
        var quiz = ASSESSMENTS[key];
        if (!quiz) return;

        var state = {
            key: key,
            quiz: quiz,
            step: 0, // 0 = intro
            answers: new Array(quiz.questions.length).fill(null)
        };

        renderQuizIntro(state);
    }

    function quizBody() {
        return document.getElementById('quizModalBody');
    }

    function renderQuizIntro(state) {
        var q = state.quiz;
        quizBody().innerHTML =
            '<span class="assessment-tag assessment-tag-' + q.colorClass + '">' + q.tag + '</span>' +
            '<h3 class="modal-title">' + q.title + '</h3>' +
            '<p class="modal-lead">' + q.intro + '</p>' +
            '<p class="quiz-note">' +
                '<i class="fas fa-lock"></i> Your answers are processed only in your browser and are never sent anywhere. ' +
                'This is a self-reflection tool, not a clinical diagnosis.' +
            '</p>' +
            '<button type="button" class="btn btn-primary quiz-begin-btn">Begin Assessment</button>';

        quizBody().querySelector('.quiz-begin-btn').addEventListener('click', function () {
            state.step = 1;
            renderQuizQuestion(state);
        });
    }

    function renderQuizQuestion(state) {
        var q = state.quiz;
        var idx = state.step - 1;
        var total = q.questions.length;
        var questionObj = q.questions[idx];
        var questionText = typeof questionObj === 'string' ? questionObj : questionObj.text;
        var questionHint = (typeof questionObj === 'object' && questionObj.hint) ? questionObj.hint : '';
        var progressPct = Math.round((idx / total) * 100);
        var selected = state.answers[idx];

        var optionsHtml = q.options.map(function (opt, i) {
            var checked = selected === opt.value ? 'checked' : '';
            return (
                '<label class="quiz-option ' + (checked ? 'is-selected' : '') + '">' +
                    '<input type="radio" name="quizOption" value="' + opt.value + '" ' + checked + '>' +
                    '<span>' + opt.label + '</span>' +
                '</label>'
            );
        }).join('');

        quizBody().innerHTML =
            '<div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:' + progressPct + '%"></div></div>' +
            '<p class="quiz-step-count">Question ' + (idx + 1) + ' of ' + total + '</p>' +
            '<h4 class="quiz-question">' + questionText + '</h4>' +
            (questionHint ? '<p class="quiz-question-hint">' + questionHint + '</p>' : '') +
            '<div class="quiz-options">' + optionsHtml + '</div>' +
            '<div class="quiz-nav">' +
                '<button type="button" class="btn btn-secondary quiz-back-btn" ' + (idx === 0 ? 'disabled' : '') + '>Back</button>' +
                '<button type="button" class="btn btn-primary quiz-next-btn" ' + (selected === null ? 'disabled' : '') + '>' +
                    (idx === total - 1 ? 'See Results' : 'Next') +
                '</button>' +
            '</div>';

        var nextBtn = quizBody().querySelector('.quiz-next-btn');
        var backBtn = quizBody().querySelector('.quiz-back-btn');

        quizBody().querySelectorAll('input[name="quizOption"]').forEach(function (input) {
            input.addEventListener('change', function () {
                state.answers[idx] = parseInt(input.value, 10);
                nextBtn.disabled = false;
                quizBody().querySelectorAll('.quiz-option').forEach(function (lbl) {
                    lbl.classList.remove('is-selected');
                });
                input.closest('.quiz-option').classList.add('is-selected');
            });
        });

        backBtn.addEventListener('click', function () {
            if (idx === 0) return;
            state.step -= 1;
            renderQuizQuestion(state);
        });

        nextBtn.addEventListener('click', function () {
            if (state.answers[idx] === null) return;

            // Special handling for the sensitive self-harm item (PHQ-9 item 9)
            if (typeof q.sensitiveIndex === 'number' && idx === q.sensitiveIndex && state.answers[idx] > 0) {
                state.flaggedSensitive = true;
            }

            if (idx === total - 1) {
                renderQuizResults(state);
            } else {
                state.step += 1;
                renderQuizQuestion(state);
            }
        });
    }

    function renderQuizResults(state) {
        var q = state.quiz;

        var maxOptionValue = q.options[q.options.length - 1].value;
        var reverseSet = q.reverseIndices || [];

        var total = state.answers.reduce(function (sum, v, i) {
            var value = v;
            if (reverseSet.indexOf(i) !== -1) {
                value = maxOptionValue - v;
            }
            return sum + value;
        }, 0);

        var result = q.scorer(total);

        var crisisHtml = '';
        if (state.flaggedSensitive) {
            crisisHtml =
                '<div class="quiz-crisis-note">' +
                    '<i class="fas fa-heart-circle-exclamation"></i>' +
                    '<div>' +
                        '<strong>You matter, and support is available.</strong>' +
                        '<p>One of your answers suggests you may be going through a difficult time. ' +
                        'Please know you don\'t have to go through this alone &mdash; reach out to Let\'s Heal & Thrive ' +
                        'directly at <strong>+91 73032 07475</strong> or ' +
                        '<strong>letshealnthrive@gmail.com</strong>, or talk to someone you trust.</p>' +
                    '</div>' +
                '</div>';
        }

        quizBody().innerHTML =
            '<span class="assessment-tag assessment-tag-' + q.colorClass + '">' + q.tag + '</span>' +
            '<h3 class="modal-title">Your Results</h3>' +
            '<div class="quiz-result-badge quiz-result-' + result.tone + '">' + result.level + '</div>' +
            '<p class="modal-lead">' + result.text + '</p>' +
            crisisHtml +
            '<p class="quiz-note"><i class="fas fa-circle-info"></i> This is just a starting point for reflection, not a medical diagnosis. If you\'d like to talk to someone, Let\'s Heal & Thrive is here for you &mdash; call/WhatsApp <strong>+91 73032 07475</strong> or email <strong>letshealnthrive@gmail.com</strong>.</p>' +
            '<div class="quiz-result-actions">' +
                '<button type="button" class="btn btn-secondary quiz-retake-btn">Retake</button>' +
                '<button type="button" class="btn btn-primary quiz-book-btn">Book a Consultation</button>' +
            '</div>';

        quizBody().querySelector('.quiz-retake-btn').addEventListener('click', function () {
            startQuiz(state.key);
        });

        quizBody().querySelector('.quiz-book-btn').addEventListener('click', function () {
            closeModal('quizModal');
            resetBookingForm();
            openModal('bookingModal');
        });
    }

    /* =====================================================
       BOOKING FORM
    ===================================================== */

    var bookingForm = document.getElementById('bookingForm');
    var ageInput = document.getElementById('bkAge');
    var consentBlock = document.getElementById('consentBlock');
    var consentCheck = document.getElementById('consentCheck');
    var formError = document.getElementById('formError');
    var dateInput = document.getElementById('bkDate');
    var timeSelect = document.getElementById('bkTime');

    // Working hours: 10:00 AM - 8:00 PM, every day, in 30-minute slots.
    function buildTimeSlots() {
        var slots = [];
        for (var h = 10; h < 20; h++) {
            [0, 30].forEach(function (m) {
                var hour12 = h > 12 ? h - 12 : h;
                var ampm = h >= 12 ? 'PM' : 'AM';
                var label = hour12 + ':' + (m === 0 ? '00' : m) + ' ' + ampm;
                var value = (h < 10 ? '0' + h : h) + ':' + (m === 0 ? '00' : m);
                slots.push({ value: value, label: label });
            });
        }
        return slots;
    }

    if (timeSelect) {
        buildTimeSlots().forEach(function (slot) {
            var opt = document.createElement('option');
            opt.value = slot.value;
            opt.textContent = slot.label;
            timeSelect.appendChild(opt);
        });
    }

    if (dateInput) {
        // Prevent picking a date in the past (all 7 days are otherwise open).
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = yyyy + '-' + mm + '-' + dd;
    }

    function resetBookingForm() {
        if (!bookingForm) return;
        bookingForm.reset();
        consentBlock.hidden = true;
        formError.hidden = true;
        document.getElementById('bookingFormWrap').hidden = false;
        document.getElementById('bookingSuccessWrap').hidden = true;
    }

    if (ageInput) {
        ageInput.addEventListener('input', function () {
            var age = parseInt(ageInput.value, 10);
            consentBlock.hidden = !(age > 0 && age < 18);
        });
    }

    function isValidName(value) {
        return value.replace(/\s/g, '').length >= 2 && /[a-zA-Z]/.test(value);
    }

    function isValidPhone(value) {
        var digitsOnly = value.replace(/\D/g, '');
        return /^[6-9]\d{9}$/.test(digitsOnly);
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('bkName').value.trim();
            var phone = document.getElementById('bkPhone').value.trim();
            var email = document.getElementById('bkEmail').value.trim();
            var age = parseInt(ageInput.value, 10);
            var consultationType = document.getElementById('bkType').value;
            var preferredDate = dateInput.value;
            var preferredTime = timeSelect.value;
            var preferredTimeLabel = timeSelect.options[timeSelect.selectedIndex]
                ? timeSelect.options[timeSelect.selectedIndex].textContent
                : '';
            var message = document.getElementById('bkMessage').value.trim();

            if (!name || !phone || !age || !consultationType || !preferredDate || !preferredTime) {
                formError.textContent = 'Please fill in all required fields.';
                formError.hidden = false;
                return;
            }

            if (!isValidName(name)) {
                formError.textContent = 'Please enter your full name.';
                formError.hidden = false;
                return;
            }

            if (!isValidPhone(phone)) {
                formError.textContent = 'Please enter a valid 10-digit mobile number (e.g. 98765 43210).';
                formError.hidden = false;
                return;
            }

            if (email && !isValidEmail(email)) {
                formError.textContent = 'Please enter a valid email address, or leave it blank.';
                formError.hidden = false;
                return;
            }

            if (!(age >= 3 && age <= 100)) {
                formError.textContent = 'Please enter a valid age between 3 and 100.';
                formError.hidden = false;
                return;
            }

            if (age < 18 && !consentCheck.checked) {
                formError.textContent = 'Please confirm the parental consent acknowledgement above.';
                formError.hidden = false;
                return;
            }

            formError.hidden = true;

            var record = {
                id: 'bk_' + Date.now(),
                name: name,
                phone: phone,
                email: email,
                age: age,
                consultationType: consultationType,
                preferredDate: preferredDate,
                preferredTime: preferredTime,
                message: message,
                requiresConsent: age < 18,
                submittedAt: new Date().toISOString()
            };

            saveBookingRecord(record);

            // Show confirmation
            var prettyDate = new Date(preferredDate + 'T00:00:00').toLocaleDateString('en-IN', {
                weekday: 'long', day: 'numeric', month: 'long'
            });

            document.getElementById('successName').textContent = name;
            document.getElementById('successPhone').textContent = phone;
            document.getElementById('successSlot').textContent = prettyDate + ' at ' + preferredTimeLabel;
            document.getElementById('successConsentNote').hidden = age >= 18;

            document.getElementById('bookingFormWrap').hidden = true;
            document.getElementById('bookingSuccessWrap').hidden = false;
        });
    }

    // Stores the booking locally in this browser as a durable record of the
    // request. For production use, point this function at your real backend
    // (see README.md in this project for a ready-made integration guide —
    // e.g. Google Sheets via Apps Script, or any REST endpoint) so bookings
    // land in an actual database rather than only the visitor's browser.
    function saveBookingRecord(record) {

        // 1. Always save a local backup first. This guarantees the booking
        //    is never lost, even if the network request below fails,
        //    is blocked, or BOOKING_ENDPOINT hasn't been configured yet.
        try {
            var existing = JSON.parse(localStorage.getItem('lht_bookings') || '[]');
            existing.push(record);
            localStorage.setItem('lht_bookings', JSON.stringify(existing));
        } catch (err) {
            console.warn('Could not save booking locally:', err);
        }

        // 2. Best-effort sync to the free Google Sheets + email backend
        //    (see google-apps-script/SETUP.md). This never blocks the
        //    booking confirmation shown to the visitor — if it's not
        //    configured yet, or the request fails for any reason
        //    (offline, free quota hit, etc.), the site still behaves
        //    normally and the booking is still safe in localStorage.
        if (typeof BOOKING_ENDPOINT === 'string' && BOOKING_ENDPOINT) {
            try {
                fetch(BOOKING_ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors', // Apps Script Web Apps don't return CORS headers;
                                      // no-cors still delivers the POST, we just can't read the response.
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(record)
                }).catch(function (err) {
                    console.warn('Booking sync to backend failed (booking is still saved locally):', err);
                });
            } catch (err) {
                console.warn('Booking sync to backend failed (booking is still saved locally):', err);
            }
        }
    }

});



// Dynamic pricing based on consultation type
const servicePricing = {
    "Individual Therapy": { full: 1500, discounted: 750 },
    "Family Counselling": { full: 2400, discounted: 1200 },
    "Child Therapy": { full: 1500, discounted: 750 },
    "CBT-Focused Therapy": { full: 1500, discounted: 750 },
    "Behavioral Therapy": { full: 1500, discounted: 750 },
    "Relationship Counselling": { full: 2400, discounted: 1200 },
    "Other": { full: 1500, discounted: 750 }
};

document.addEventListener("DOMContentLoaded", function () {
    const typeSelect = document.getElementById("bkType");
    const priceStrike = document.getElementById("priceStrike");
    const priceNow = document.getElementById("priceNow");

    if (typeSelect && priceStrike && priceNow) {
        typeSelect.addEventListener("change", function () {
            const selected = servicePricing[this.value];
            if (selected) {
                priceStrike.textContent = "₹" + selected.full.toLocaleString("en-IN");
                priceNow.textContent = "₹" + selected.discounted.toLocaleString("en-IN");
            }
        });
    }
});
