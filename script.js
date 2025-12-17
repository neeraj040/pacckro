/**
 * PACKKRO - Main Logic
 */

// Handle Quote Form Submission
document.getElementById("quoteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Collect data from form
    const formData = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        pickup: form.pickup.value,
        drop: form.drop.value,
        moveType: form.moveType.value,
        date: form.date.value,
        message: form.message.value
    };

    const submitBtn = form.querySelector("button");
    const originalBtnText = submitBtn.textContent;

    try {
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwUbhQKiZnRC3Y0qZYkQr-3XWoldqEThMStzt6K3Z6IrKuqCFRePTrZ65XPv9Qh02qBZg/exec",
            {
                method: "POST",
                body: JSON.stringify(formData)
            }
        );

        if (response.ok) {
            alert("Quote submitted successfully! We will contact you shortly.");
            form.reset();
        } else {
            throw new Error("Submission failed");
        }
    } catch (error) {
        alert("There was a network error. Please try again or call us directly.");
        console.error("Form Error:", error);
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Review Carousel Controls
const carousel = document.getElementById("reviewsCarousel");
const prevBtn = document.getElementById("prevReview");
const nextBtn = document.getElementById("nextReview");

const scrollAmount = 340; // Card width + margins

prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});