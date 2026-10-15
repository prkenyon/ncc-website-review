// Wait until the webpage is ready before finding the form.
document.addEventListener("DOMContentLoaded", function () {

    // Find the quote form and the message area.
    const form = document.getElementById("quoteForm");
    const message = document.getElementById("quoteMessage");

    // Stop if this page does not contain the quote form.
    if (!form || !message) {
        return;
    }

    // Run this code when the visitor submits the form.
    form.addEventListener("submit", function (event) {

        // Prevent the browser from submitting to a server.
        event.preventDefault();

        // Make sure the PDF library has loaded.
        if (!window.jspdf || !window.jspdf.jsPDF) {
            message.textContent =
                "The PDF tool did not load. Please refresh and try again.";
            return;
        }

        // Create a new PDF document.
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // Set up the page layout.
        const leftMargin = 20;
        const textWidth = 170;
        let y = 25;

        // Add the document title.
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text("North Country Construction", leftMargin, y);

        y += 10;

        pdf.setFontSize(14);
        pdf.text("Quote Request", leftMargin, y);

        y += 12;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text(
            "Please contact me about my custom-home project.",
            leftMargin,
            y
        );

        y += 12;

        // Add a label and its answer, wrapping long text as needed.
        function addField(label, value) {

            pdf.setFontSize(11);
            pdf.setFont("helvetica", "bold");

            // Start a new page if there is not enough room.
            if (y > 260) {
                pdf.addPage();
                y = 20;
            }

            pdf.text(label, leftMargin, y);
            y += 6;

            pdf.setFont("helvetica", "normal");

            // Use a clear placeholder for optional unanswered fields.
            const answer = value.trim() || "Not provided";
            const lines = pdf.splitTextToSize(answer, textWidth);

            // Keep the answer together on the next page if necessary.
            if (y + lines.length * 6 > 275) {
                pdf.addPage();
                y = 20;
            }

            pdf.text(lines, leftMargin, y);
            y += lines.length * 6 + 8;
        }

        // Read each answer from the original form.
        addField(
            "Name",
            document.getElementById("customerName").value
        );

        addField(
            "Email Address",
            document.getElementById("customerEmail").value
        );

        addField(
            "Phone Number",
            document.getElementById("customerPhone").value
        );

        addField(
            "Planned Building Location",
            document.getElementById("buildLocation").value
        );

        addField(
            "About the Home",
            document.getElementById("projectDescription").value
        );

        addField(
            "Building Timeframe",
            document.getElementById("timeframe").value
        );

        addField(
            "How They Heard About NCC",
            document.getElementById("referralSource").value
        );

        // Add a clearly labeled section for optional details.
        addField(
            "ADDITIONAL PROJECT DETAILS (OPTIONAL)",
            "The following information was provided by the customer. " +
            "Unanswered questions are marked Not provided."
        );

        // Read the optional project details.
        addField(
            "Type of Project",
            document.getElementById("buildType").value
        );

        addField(
            "Property Ownership Status",
            document.getElementById("propertyStatus").value
        );

        addField(
            "Property or Site Details",
            document.getElementById("siteDetails").value
        );

        addField(
            "Utilities",
            document.getElementById("utilities").value
        );

        addField(
            "Approximate Construction Budget",
            document.getElementById("budget").value
        );

        addField(
            "Financing Status",
            document.getElementById("financing").value
        );

        addField(
            "Building Plans",
            document.getElementById("planStatus").value
        );

        // Add NCC's contact information to the PDF.
        if (y > 260) {
            pdf.addPage();
            y = 20;
        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.text("North Country Construction", leftMargin, y);

        y += 7;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text("Phone: 307-461-2896", leftMargin, y);

        y += 6;
        pdf.text("Email: NCCinc06@gmail.com", leftMargin, y);

        // Download the PDF to the visitor's device.
        pdf.save("NCC-Quote-Request.pdf");

        // Prepare an email link for the visitor.
        const subject = encodeURIComponent(
            "NCC Custom Home Quote Request"
        );

        const body = encodeURIComponent(
            "Hello North Country Construction,\n\n" +
            "I have completed a quote request. " +
            "Please find my downloaded PDF attached.\n\n" +
            "Thank you."
        );

        const emailLink =
            "mailto:NCCinc06@gmail.com" +
            "?subject=" + subject +
            "&body=" + body;

        // Explain the next steps and provide a prominent email button.
        message.innerHTML =
            '<p><strong>Your PDF has been downloaded!</strong></p>' +
            '<p>Click <strong>Email Jake</strong> below to open your ' +
            'default email application with a message addressed to ' +
            'North Country Construction.</p>' +
            '<p><strong>To submit your request:</strong></p>' +
            '<ol>' +
            '<li>Attach <strong>NCC-Quote-Request.pdf</strong> to the email.</li>' +
            '<li>Review the message and click <strong>Send</strong>.</li>' +
            '</ol>' +
            '<p>Your request is not sent until you send the email.</p>' +
            '<p>If your email application does not open, use the ' +
            '<a href="' + emailLink + '">Email Jake</a> link below ' +
            'or email <a href="mailto:NCCinc06@gmail.com">' +
            'NCCinc06@gmail.com</a> directly. Attach the downloaded PDF.</p>' +
            '<p><a href="' + emailLink + '" class="email-jake-button">' +
            'Email Jake</a></p>';

    });

});