import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <p>GET IN TOUCH</p>

        <h1>
          We'd Love to
          <br />
          Hear From You
        </h1>

        <span>
          Have a question about an order, product or anything else?
          We're here to help.
        </span>
      </section>

      {/* Contact Content */}
      <section className="contact-content">

        {/* Contact Information */}
        <div className="contact-info">

          <p className="contact-label">CONTACT DECORNEXT</p>

          <h2>
            Let's Talk About
            <br />
            Your Space
          </h2>

          <p className="contact-description">
            Whether you need help choosing the perfect décor,
            have a question about your order, or simply want
            to say hello, feel free to reach out.
          </p>

          <div className="contact-details">

            {/* Email */}
            <div className="contact-detail">
              <div className="contact-icon">✉</div>

              <div>
                <span>Email</span>
                <strong>support@decornext.com</strong>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-detail">
              <div className="contact-icon">☎</div>

              <div>
                <span>Phone</span>
                <strong>+91 98765 43210</strong>
              </div>
            </div>

            {/* Location */}
            <div className="contact-detail">
              <div className="contact-icon">⌖</div>

              <div>
                <span>Location</span>
                <strong>Dehradun, India</strong>
              </div>
            </div>

            {/* Working Hours */}
            <div className="contact-detail">
              <div className="contact-icon">◷</div>

              <div>
                <span>Working Hours</span>
                <strong>Mon – Sat, 10 AM – 6 PM</strong>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card">

          <form
            onSubmit={handleSubmit}
            className="contact-form"
          >

            {/* Name + Email */}
            <div className="contact-form-row">

              <div className="contact-form-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* Subject */}
            <div className="contact-form-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div className="contact-form-group">
              <label>Message</label>

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="contact-submit-button"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>

          </form>

        </div>
      </section>

    </div>
  );
}

export default Contact;