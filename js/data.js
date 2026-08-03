// =========================================================
// LET'S HEAL & THRIVE — CONTENT DATA
// Service write-ups, assessment questions, legal pages
// =========================================================


/* =========================================================
   SERVICE WRITE-UPS (shown in "Learn More" modal)
========================================================= */

const SERVICES = {

    individual: {
        title: "Individual Therapy",
        eyebrow: "One-on-one counselling",
        intro:
            "Individual therapy is a confidential, one-on-one space to " +
            "talk through whatever is on your mind, at your own pace, " +
            "without judgement.",
        signs: [
            "You feel stuck, overwhelmed, or emotionally drained more days than not",
            "You find yourself overthinking decisions or replaying conversations",
            "You're going through a life transition (career, city, relationship, health)",
            "You want to understand yourself better but aren't sure where to start"
        ],
        expect: [
            "A warm, non-judgemental space to speak openly",
            "Sessions shaped around your goals, not a fixed script",
            "Practical tools alongside deeper self-understanding"
        ]
    },

    relationship: {
        title: "Relationship Counselling",
        eyebrow: "For couples & individuals",
        intro:
            "Relationship counselling helps you understand recurring patterns " +
            "in how you connect with others and build healthier, clearer communication.",
        signs: [
            "Conversations with your partner or family often turn into conflict",
            "You feel unheard, disconnected, or misunderstood in a key relationship",
            "You keep repeating the same argument without resolution",
            "You want support navigating a relationship transition"
        ],
        expect: [
            "A supportive space to unpack relationship patterns",
            "Communication tools you can use outside sessions",
            "Sessions available individually or together, depending on your need"
        ]
    },

    anxiety: {
        title: "Anxiety & Stress",
        eyebrow: "Calming an overactive mind",
        intro:
            "This work focuses on understanding what's driving your anxiety or " +
            "stress, and building practical ways to feel calmer and more in control.",
        signs: [
            "Racing thoughts, constant worry, or a mind that won't switch off",
            "Physical symptoms like a tight chest, restlessness, or trouble sleeping",
            "Feeling on edge, easily overwhelmed, or unable to relax",
            "Stress that's starting to affect work, sleep, or relationships"
        ],
        expect: [
            "Evidence-informed techniques (including CBT-style tools) to manage worry",
            "Help identifying triggers and unhelpful thought patterns",
            "Practical coping strategies you can practise between sessions"
        ]
    },

    "self-esteem": {
        title: "Self-Esteem & Confidence",
        eyebrow: "Building a kinder relationship with yourself",
        intro:
            "This work is about understanding where self-doubt comes from and " +
            "gradually building a steadier, kinder sense of self-worth.",
        signs: [
            "You often doubt yourself or feel like you're not good enough",
            "You compare yourself to others frequently",
            "Fear of judgement holds you back from opportunities",
            "You find it hard to accept compliments or acknowledge your strengths"
        ],
        expect: [
            "A safe space to explore where these beliefs come from",
            "Practical exercises to build self-awareness and self-acceptance",
            "Gradual, sustainable growth — not a quick fix"
        ]
    },

    grief: {
        title: "Grief & Loss",
        eyebrow: "Honouring your experience",
        intro:
            "Grief counselling offers a compassionate space to process loss — " +
            "of a person, relationship, health, or a chapter of life — at your own pace.",
        signs: [
            "You're struggling to cope with the loss of someone or something important",
            "You feel guilt, anger, numbness, or waves of sadness you can't explain",
            "People around you expect you to have \"moved on\" already",
            "You want support making sense of a loss, however recent or long ago"
        ],
        expect: [
            "No timeline or pressure — grief is allowed to take the time it needs",
            "A space to honour your experience and what it means to you",
            "Support finding ways to carry the loss and move forward gently"
        ]
    },

    wellbeing: {
        title: "Emotional Wellbeing",
        eyebrow: "General mental wellness",
        intro:
            "Sometimes there isn't a single crisis — you simply want more " +
            "balance, clarity, and a healthier relationship with your emotions.",
        signs: [
            "You're looking for greater balance and emotional clarity",
            "You want to understand your patterns of thinking and reacting",
            "You feel \"fine\" but sense something could be better",
            "You want ongoing support for personal growth, not just crisis management"
        ],
        expect: [
            "A reflective space to pause and check in with yourself",
            "Support building healthier daily habits and coping tools",
            "A collaborative, growth-focused way of working together"
        ]
    }

};


/* =========================================================
   LEGAL PAGES (shown in-page, not on external sites)
========================================================= */

const LEGAL_PAGES = {

    terms: {
        title: "Terms of Service",
        html: `
            <p>These Terms of Service ("Terms") govern your use of the
            Let's Heal &amp; Thrive website and the booking of consultations
            with Nidhi Agarwal, Psychologist &amp; Psychotherapist. By using
            this website or booking a consultation, you agree to these Terms.</p>

            <h5>1. Nature of Services</h5>
            <p>Let's Heal &amp; Thrive provides psychological counselling and
            psychotherapy services. Self-assessment tools on this website are
            for informational and educational purposes only and do not
            constitute a clinical diagnosis.</p>

            <h5>2. Bookings &amp; Consultations</h5>
            <p>Consultation requests submitted through this website are
            appointment requests, not confirmed bookings, until confirmed
            by our team by phone, email or WhatsApp.</p>

            <h5>3. Clients Under 18</h5>
            <p>For clients under the age of 18, a parent or legal guardian
            must provide signed consent before therapy begins, using the
            Parental Consent Form made available at the time of booking.</p>

            <h5>4. Emergencies</h5>
            <p>This website and our consultation booking process are not
            intended for emergencies. If you or someone you know is in
            crisis, please contact Tele MANAS at 1800-89-14416 or your
            nearest emergency service immediately.</p>

            <h5>5. Changes to These Terms</h5>
            <p>We may update these Terms from time to time. Continued use
            of the website after changes are posted constitutes acceptance
            of the revised Terms.</p>
        `
    },

    privacy: {
        title: "Privacy Policy",
        html: `
            <p>This Privacy Policy explains how Let's Heal &amp; Thrive
            collects, uses and protects the information you share with us
            through this website.</p>

            <h5>1. Information We Collect</h5>
            <p>When you request a consultation, we collect your name,
            contact details (phone/email), age, and the type of
            consultation you're interested in. Self-assessment answers are
            processed in your own browser and are not transmitted to our
            servers.</p>

            <h5>2. How We Use Your Information</h5>
            <p>We use the information you provide solely to schedule,
            confirm and manage your consultation, and to communicate with
            you about your appointment.</p>

            <h5>3. Confidentiality</h5>
            <p>Information shared during therapy sessions is kept strictly
            confidential in line with professional ethical guidelines, and
            will only be disclosed where there is a risk of harm to you or
            another person, or where required by law.</p>

            <h5>4. Data Storage</h5>
            <p>Booking details are stored securely and retained only for
            as long as necessary to provide our services and meet our
            professional and legal record-keeping obligations.</p>

            <h5>5. Your Rights</h5>
            <p>You may request access to, correction of, or deletion of
            your personal information at any time by contacting us at
            letshealnthrive@gmail.com.</p>
        `
    },

    cancellation: {
        title: "Cancellation Policy",
        html: `
            <p>We understand that plans can change. This policy outlines
            how rescheduling and cancellations are handled.</p>

            <h5>1. Rescheduling</h5>
            <p>You may reschedule a confirmed appointment by giving at
            least 4&ndash;5 hours' notice before your scheduled session time,
            by phone, email or WhatsApp, subject to availability.</p>

            <h5>2. Cancellations</h5>
            <p>Cancellations made with less than 4&ndash;5 hours' notice, or
            missed appointments without prior notice, may be subject to a
            cancellation fee, at the discretion of the therapist.</p>

            <h5>3. Late Arrivals</h5>
            <p>If you arrive late for a session, the appointment will
            typically still end at the originally scheduled time, so that
            subsequent clients are not affected.</p>

            <h5>4. Emergencies &amp; Exceptions</h5>
            <p>Genuine emergencies are considered on a case-by-case basis.
            Please contact us as soon as possible if something comes up
            unexpectedly.</p>

            <h5>5. Contact</h5>
            <p>To reschedule or cancel an appointment, please reach out at
            +91 73032 07475 or letshealnthrive@gmail.com.</p>
        `
    }

};



/* =========================================================
   SELF-ASSESSMENT — MENTAL WELLBEING CHECK-IN
   A single, plain-language 10-question check-in for the
   general public (not a clinical instrument). Question 10
   is reverse-scored (higher agreement = healthier).
========================================================= */

const CHECKIN_OPTIONS = [
    { label: "Never", value: 0 },
    { label: "Rarely", value: 1 },
    { label: "Sometimes", value: 2 },
    { label: "Often", value: 3 },
    { label: "Almost Always", value: 4 }
];

function checkinScoring(bands) {
    return function (total) {
        for (var i = 0; i < bands.length; i++) {
            if (total <= bands[i].max) return bands[i];
        }
        return bands[bands.length - 1];
    };
}

const ASSESSMENTS = {

    wellbeing: {
        title: "Mental Wellbeing Check-In",
        tag: "Self Check-In",
        colorClass: "green",
        intro:
            "Think about the last 2 weeks. For each statement, choose how " +
            "often it's been true for you. There are no right or wrong " +
            "answers — this is just a moment to check in with yourself.",
        options: CHECKIN_OPTIONS,
        reverseIndices: [9],
        questions: [
            { text: "I feel sad, low, or down.", hint: "Like a heaviness that doesn't fully go away, even on okay days." },
            { text: "I feel worried or on edge.", hint: "My mind keeps racing, or I feel tense even when nothing's \u201cwrong.\u201d" },
            { text: "My sleep feels off.", hint: "Trouble falling asleep, waking up a lot, or feeling tired even after a full night's sleep." },
            { text: "I feel tired or low on energy.", hint: "Even simple tasks feel like more effort than they should." },
            { text: "Things I used to enjoy don't feel as fun anymore.", hint: "Hobbies, hanging out, food, shows — things that used to lift my mood." },
            { text: "I feel like everything is \u201ctoo much.\u201d", hint: "Work, home, or daily life feels overwhelming to keep up with." },
            { text: "I've been pulling away from people.", hint: "Avoiding calls, messages, or plans with friends and family, even when I don't want to." },
            { text: "I'm harder on myself than I'd be on a friend.", hint: "A lot of self-criticism, guilt, or feeling \u201cnot good enough.\u201d" },
            { text: "My mind feels foggy or scattered.", hint: "Trouble focusing, remembering things, or making even small decisions." },
            { text: "I feel hopeful about my life and what's ahead.", hint: "Often feeling this way is a good sign — this one's scored the opposite way." }
        ],
        scorer: checkinScoring([
            { max: 10, level: "Doing Well", tone: "good", text: "Overall, your answers suggest you're coping well right now. That's genuinely good to hear \u2014 keep doing what's working for you, and check in with yourself again anytime." },
            { max: 20, level: "Mild Difficulty", tone: "mild", text: "It sounds like you might be going through a bit of a rough patch. That's completely normal from time to time. Talking to someone you trust \u2014 a friend, family member, or a professional \u2014 can make a real difference." },
            { max: 30, level: "Moderate Difficulty", tone: "moderate", text: "It looks like you've been carrying a fair amount lately, and it may be affecting your day-to-day life. You don't have to figure this out alone \u2014 speaking with a professional could really help." },
            { max: 40, level: "Significant Difficulty", tone: "high", text: "It sounds like things have been genuinely tough for you recently. Please know this isn't something you have to push through by yourself. We'd really encourage you to book a consultation soon so you have someone to talk to." }
        ])
    }

};
