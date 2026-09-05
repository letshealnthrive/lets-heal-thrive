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
       BOOKING FLOW (4 steps: service+format, date/time,
       contact details, summary)
    ===================================================== */

    var booking = {
        service: null,
        format: null,
        price: null,
        date: null,       // 'YYYY-MM-DD'
        dateLabel: null,  // 'Friday, 4 September'
        time: null,       // '10:00'
        timeLabel: null,  // '10:00 AM'
        who: 'myself',
        otherName: ''
    };

    var currentStep = 1;

    var bookingFormWrap = document.getElementById('bookingFormWrap');
    var bookingSuccessWrap = document.getElementById('bookingSuccessWrap');
    var bookingHeaderPrice = document.getElementById('bookingHeaderPrice');
    var bookingProgress = document.getElementById('bookingProgress');
    var bookingStepLabel = document.getElementById('bookingStepLabel');

    function formatINR(n) {
        return '₹' + n.toLocaleString('en-IN');
    }

    function goToStep(n) {
        currentStep = n;

        document.querySelectorAll('.booking-step').forEach(function (stepEl) {
            stepEl.hidden = (parseInt(stepEl.getAttribute('data-step'), 10) !== n);
        });

        bookingProgress.querySelectorAll('.booking-progress-seg').forEach(function (seg) {
            var segNum = parseInt(seg.getAttribute('data-seg'), 10);
            seg.classList.remove('is-active', 'is-done');
            if (segNum < n) seg.classList.add('is-done');
            else if (segNum === n) seg.classList.add('is-active');
        });

        bookingStepLabel.textContent = 'Step ' + n + ' of 4';
    }

    document.querySelectorAll('.booking-back-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            goToStep(parseInt(btn.getAttribute('data-back'), 10));
        });
    });


    /* ---------- STEP 1: service + format ---------- */

    var serviceOptions = document.getElementById('serviceOptions');
    var formatBlock = document.getElementById('formatBlock');
    var formatToast = document.getElementById('formatToast');
    var step1ContinueBtn = document.getElementById('step1ContinueBtn');
    var inpersonFormatBtn = document.getElementById('inpersonFormatBtn');
    var formErrorStep1 = document.getElementById('formErrorStep1');
    var toastTimer = null;

    if (serviceOptions) {
        serviceOptions.querySelectorAll('.service-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                serviceOptions.querySelectorAll('.service-option').forEach(function (b) {
                    b.classList.remove('is-active');
                });
                btn.classList.add('is-active');

                var key = btn.getAttribute('data-service');
                var svc = BOOKING_SERVICES[key];
                booking.service = key;
                booking.format = null;
                booking.price = null;

                document.getElementById('fmtOnlinePrice').textContent = formatINR(svc.online);
                document.getElementById('fmtInpersonPrice').textContent = formatINR(svc.inperson);

                formatBlock.hidden = false;
                formatBlock.querySelectorAll('.format-option').forEach(function (f) {
                    f.classList.remove('is-selected');
                });
                formatToast.hidden = true;
                bookingHeaderPrice.hidden = true;
                step1ContinueBtn.disabled = true;
                formErrorStep1.hidden = true;

                updateAgeConstraintForService();
            });
        });
    }

    function updateAgeConstraintForService() {
        var ageHelp = document.getElementById('ageFieldHint');
        if (!ageInput) return;

        if (booking.service === 'teen') {
            ageInput.max = 18;
            if (ageHelp) ageHelp.textContent = 'Teen Counselling is for clients aged 18 and under.';
        } else {
            ageInput.removeAttribute('max');
            if (ageHelp) ageHelp.textContent = '';
        }
    }

    if (formatBlock) {
        formatBlock.querySelectorAll('.format-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var fmt = btn.getAttribute('data-format');

                if (fmt === 'inperson') {
                    formatToast.hidden = false;
                    clearTimeout(toastTimer);
                    toastTimer = setTimeout(function () {
                        formatToast.hidden = true;
                    }, 6000);
                    return;
                }

                formatBlock.querySelectorAll('.format-option').forEach(function (f) {
                    f.classList.remove('is-selected');
                });
                btn.classList.add('is-selected');

                var svc = BOOKING_SERVICES[booking.service];
                booking.format = 'online';
                booking.price = svc.online;

                bookingHeaderPrice.textContent = formatINR(booking.price);
                bookingHeaderPrice.hidden = false;
                step1ContinueBtn.disabled = false;
            });
        });
    }

    if (step1ContinueBtn) {
        step1ContinueBtn.addEventListener('click', function () {
            if (!booking.service || !booking.format) {
                formErrorStep1.textContent = 'Please choose a service and format to continue.';
                formErrorStep1.hidden = false;
                return;
            }
            formErrorStep1.hidden = true;
            buildDateStrip();
            goToStep(2);
        });
    }


    /* ---------- STEP 2: date + time ---------- */

    var dateStrip = document.getElementById('dateStrip');
    var timeSlotsGrid = document.getElementById('timeSlotsGrid');
    var selectedDateLabel = document.getElementById('selectedDateLabel');
    var step2ContinueBtn = document.getElementById('step2ContinueBtn');
    var formErrorStep2 = document.getElementById('formErrorStep2');

    var WEEKDAY_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function toDateKey(d) {
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }

    function buildDateStrip() {
        if (!dateStrip || dateStrip.childElementCount) return; // build once

        var today = new Date();

        for (var i = 0; i < 14; i++) {
            var d = new Date(today);
            d.setDate(today.getDate() + i);

            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'date-strip-item';
            btn.setAttribute('data-date', toDateKey(d));
            btn.innerHTML =
                '<span class="date-strip-weekday">' + WEEKDAY_SHORT[d.getDay()] + '</span>' +
                '<span class="date-strip-day">' + d.getDate() + '</span>' +
                '<span class="date-strip-month">' + MONTH_SHORT[d.getMonth()] + '</span>';

            btn.addEventListener('click', function () {
                dateStrip.querySelectorAll('.date-strip-item').forEach(function (b) {
                    b.classList.remove('is-selected');
                });
                this.classList.add('is-selected');

                var key = this.getAttribute('data-date');
                booking.date = key;
                booking.time = null;
                booking.timeLabel = null;

                var parts = key.split('-').map(Number);
                var dObj = new Date(parts[0], parts[1] - 1, parts[2]);
                booking.dateLabel = dObj.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
                selectedDateLabel.textContent = dObj.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });

                buildTimeSlotsGrid();
                step2ContinueBtn.disabled = true;
            });

            dateStrip.appendChild(btn);

            if (i === 0) btn.click(); // auto-select today on first open
        }
    }

    // Working hours: 9:00 AM - 10:00 PM, every day, in 30-minute slots.
    function buildTimeSlotOptions() {
        var slots = [];
        for (var h = 9; h < 22; h++) {
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

    function buildTimeSlotsGrid() {
        timeSlotsGrid.innerHTML = '';

        buildTimeSlotOptions().forEach(function (slot) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'time-slot-item';
            btn.textContent = slot.label;
            btn.setAttribute('data-value', slot.value);

            btn.addEventListener('click', function () {
                timeSlotsGrid.querySelectorAll('.time-slot-item').forEach(function (b) {
                    b.classList.remove('is-selected');
                });
                this.classList.add('is-selected');
                booking.time = slot.value;
                booking.timeLabel = slot.label;
                step2ContinueBtn.disabled = false;
            });

            timeSlotsGrid.appendChild(btn);
        });
    }

    if (step2ContinueBtn) {
        step2ContinueBtn.addEventListener('click', function () {
            if (!booking.date || !booking.time) {
                formErrorStep2.textContent = 'Please pick both a date and a time to continue.';
                formErrorStep2.hidden = false;
                return;
            }
            formErrorStep2.hidden = true;
            goToStep(3);
        });
    }


    /* ---------- STEP 3: contact details ---------- */

    var whoForToggle = document.getElementById('whoForToggle');
    var otherNameRow = document.getElementById('otherNameRow');
    var bkOtherName = document.getElementById('bkOtherName');
    var ageInput = document.getElementById('bkAge');
    var consentBlock = document.getElementById('consentBlock');
    var consentCheck = document.getElementById('consentCheck');
    var bkMessage = document.getElementById('bkMessage');
    var msgCharCount = document.getElementById('msgCharCount');
    var step3ContinueBtn = document.getElementById('step3ContinueBtn');
    var formErrorStep3 = document.getElementById('formErrorStep3');

    if (whoForToggle) {
        whoForToggle.querySelectorAll('.who-for-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                whoForToggle.querySelectorAll('.who-for-option').forEach(function (b) {
                    b.classList.remove('is-active');
                });
                btn.classList.add('is-active');
                booking.who = btn.getAttribute('data-who');
                otherNameRow.hidden = (booking.who !== 'other');
            });
        });
    }

    if (ageInput) {
        ageInput.addEventListener('input', function () {
            var age = parseInt(ageInput.value, 10);
            consentBlock.hidden = !(age > 0 && age < 18);
        });
    }

    if (bkMessage) {
        bkMessage.addEventListener('input', function () {
            msgCharCount.textContent = bkMessage.value.length + '/500';
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

    if (step3ContinueBtn) {
        step3ContinueBtn.addEventListener('click', function () {
            var name = document.getElementById('bkName').value.trim();
            var phone = document.getElementById('bkPhone').value.trim();
            var email = document.getElementById('bkEmail').value.trim();
            var age = parseInt(ageInput.value, 10);
            var otherName = bkOtherName.value.trim();

            if (!name || !phone || !email || !age) {
                formErrorStep3.textContent = 'Please fill in all required fields.';
                formErrorStep3.hidden = false;
                return;
            }

            if (booking.who === 'other' && !otherName) {
                formErrorStep3.textContent = "Please enter the name of the person this session is for.";
                formErrorStep3.hidden = false;
                return;
            }

            if (!isValidName(name)) {
                formErrorStep3.textContent = 'Please enter your full name.';
                formErrorStep3.hidden = false;
                return;
            }

            if (!isValidPhone(phone)) {
                formErrorStep3.textContent = 'Please enter a valid 10-digit WhatsApp number (e.g. 98765 43210).';
                formErrorStep3.hidden = false;
                return;
            }

            if (!isValidEmail(email)) {
                formErrorStep3.textContent = 'Please enter a valid email address.';
                formErrorStep3.hidden = false;
                return;
            }

            if (!(age >= 3 && age <= 100)) {
                formErrorStep3.textContent = 'Please enter a valid age between 3 and 100.';
                formErrorStep3.hidden = false;
                return;
            }

            if (booking.service === 'teen' && age > 18) {
                formErrorStep3.textContent = 'Teen Counselling is for clients aged 18 and under. Please choose Individual Counselling instead for an adult.';
                formErrorStep3.hidden = false;
                return;
            }

            if (age < 18 && !consentCheck.checked) {
                formErrorStep3.textContent = 'Please confirm the parental consent acknowledgement above.';
                formErrorStep3.hidden = false;
                return;
            }

            formErrorStep3.hidden = true;
            booking.otherName = otherName;

            buildSummary();
            goToStep(4);
        });
    }


    /* ---------- STEP 4: summary + confirm ---------- */

    var summaryTable = document.getElementById('summaryTable');
    var confirmBookingBtn = document.getElementById('confirmBookingBtn');
    var formErrorStep4 = document.getElementById('formErrorStep4');

    function summaryRow(label, value) {
        return '<div class="summary-row"><span>' + label + '</span><strong>' + value + '</strong></div>';
    }

    function buildSummary() {
        var svc = BOOKING_SERVICES[booking.service];
        var patient = booking.who === 'other' ? booking.otherName : 'Myself';

        summaryTable.innerHTML =
            summaryRow('Therapist', 'Nidhi Agrawal') +
            summaryRow('Service', svc.name) +
            summaryRow('Format', 'Online') +
            summaryRow('Date', booking.dateLabel) +
            summaryRow('Time', booking.timeLabel + ' IST') +
            summaryRow('Patient', patient) +
            '<div class="summary-row summary-row-total"><span>Total Payable</span><strong>' + formatINR(booking.price) + '</strong></div>';
    }

    if (confirmBookingBtn) {
        confirmBookingBtn.addEventListener('click', function () {

            var name = document.getElementById('bkName').value.trim();
            var phone = document.getElementById('bkPhone').value.trim();
            var email = document.getElementById('bkEmail').value.trim();
            var age = parseInt(ageInput.value, 10);
            var message = bkMessage.value.trim();
            var svc = BOOKING_SERVICES[booking.service];

            var record = {
                id: 'bk_' + Date.now(),
                name: name,
                phone: phone,
                email: email,
                age: age,
                bookingFor: booking.who === 'other' ? booking.otherName : 'Myself',
                service: svc.name,
                format: 'Online',
                price: booking.price,
                consultationType: svc.name + ' (Online)',
                preferredDate: booking.date,
                preferredDateLabel: booking.dateLabel,
                preferredTime: booking.time,
                preferredTimeLabel: booking.timeLabel,
                message: message,
                requiresConsent: age < 18,
                submittedAt: new Date().toISOString()
            };

            saveBookingRecord(record);

            document.getElementById('successName').textContent = name;
            document.getElementById('successPhone').textContent = phone;
            document.getElementById('successSlot').textContent = booking.dateLabel + ' at ' + booking.timeLabel;
            document.getElementById('successConsentNote').hidden = age >= 18;

            bookingFormWrap.hidden = true;
            bookingSuccessWrap.hidden = false;
        });
    }


    /* ---------- reset / open ---------- */

    function resetBookingForm() {
        booking = { service: null, format: null, price: null, date: null, dateLabel: null, time: null, timeLabel: null, who: 'myself', otherName: '' };

        document.getElementById('bookingFormWrap').hidden = false;
        document.getElementById('bookingSuccessWrap').hidden = true;

        if (serviceOptions) {
            serviceOptions.querySelectorAll('.service-option').forEach(function (b) { b.classList.remove('is-active'); });
        }
        formatBlock.hidden = true;
        formatToast.hidden = true;
        bookingHeaderPrice.hidden = true;
        step1ContinueBtn.disabled = true;
        formErrorStep1.hidden = true;

        dateStrip.innerHTML = '';
        timeSlotsGrid.innerHTML = '';
        step2ContinueBtn.disabled = true;
        formErrorStep2.hidden = true;

        document.getElementById('bkName').value = '';
        document.getElementById('bkPhone').value = '';
        document.getElementById('bkEmail').value = '';
        ageInput.value = '';
        updateAgeConstraintForService();
        bkOtherName.value = '';
        bkMessage.value = '';
        msgCharCount.textContent = '0/500';
        consentBlock.hidden = true;
        consentCheck.checked = false;
        formErrorStep3.hidden = true;
        whoForToggle.querySelectorAll('.who-for-option').forEach(function (b) { b.classList.remove('is-active'); });
        whoForToggle.querySelector('[data-who="myself"]').classList.add('is-active');
        otherNameRow.hidden = true;

        formErrorStep4.hidden = true;

        goToStep(1);
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




