import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contactBg from "../assets/virtual.jpg";

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/))
      newErrors.email = "Valid email required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(`${apiBaseUrl}/api/Contact`, formData);
        toast.success(response.data.message);
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        toast.error("Failed to submit form. Try again.");
        console.error("Submit error:", error);
      }
    }
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <ToastContainer />
      <section
        className="bg-cover bg-center bg-no-repeat text-red-900 py-20 text-center"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg mt-2">We'd love to hear from you.</p>
      </section>

      {/* Contact Info + Map */}
      <section className="py-10 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Contact Info</h2>
          <ul className="space-y-4 text-lg">
            <li><i className="fas fa-phone text-primary mr-3"></i> +91 8853782340</li>
            <li><i className="fas fa-envelope text-primary mr-3"></i> support@virtualdiary.com</li>
            <li><i className="fas fa-map-marker-alt text-primary mr-3"></i> Varanasi, UP, India</li>
          </ul>
        </div>

        <div>
          <iframe
            className="w-full h-64 rounded shadow-lg"
            src="https://maps.google.com/maps?q=Varanasi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
            title="Google Map"
          ></iframe>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-base-200 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-semibold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Your Email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Your Message</label>
              <textarea
                rows="5"
                className="textarea textarea-bordered w-full"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <div className="md:col-span-2 text-center">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
