// About.jsx

import React from "react";
import virtulImage from "../assets/logo1.jpg"; // or .png based on your file

const About = () => {
  // Scroll to the "features" section
  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-8 lg:px-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-primary">
            Your Virtual Diary <br /> Your Emotional Space
          </h1>
          <p className="text-lg mb-6">
            Record your thoughts, track your emotions, and reflect on your
            growth — all in one private, beautifully designed space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToFeatures}
              className="btn btn-primary btn-lg"
            >
              Explore Features
            </button>
            <a href="/diary" className="btn btn-outline btn-secondary btn-lg">
              Start Writing
            </a>
          </div>
        </div>
        <div className="w-full">
<img
  src={virtulImage}
  alt="Virtual Diary"
  className="w-full max-w-2xl h-[300px] object-cover rounded-lg shadow-md mx-auto"
/>



        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          What Makes Virtual Diary Unique?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "🧠",
              title: "AI Prompts",
              desc: "Get intelligent suggestions to overcome writer’s block and dive deeper.",
            },
            {
              icon: "📅",
              title: "Timeline View",
              desc: "Visualize your journaling journey and emotional history by day or week.",
            },
            {
              icon: "🔐",
              title: "Secure Journaling",
              desc: "End-to-end encryption ensures your thoughts are 100% private.",
            },
            {
              icon: "🎭",
              title: "Mood Log",
              desc: "Track emotional patterns using emojis or sliders and gain self-awareness.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-base-200 p-6 rounded-xl text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Accordion */}
      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Our Purpose
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="collapse collapse-arrow bg-base-200 border border-base-300 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              🌟 Our Mission
            </div>
            <div className="collapse-content">
              <p>
                Empowering individuals to understand themselves through
                consistent journaling, mood reflection, and privacy-first
                writing tools.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 border border-base-300 rounded-box">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              🔭 Our Vision
            </div>
            <div className="collapse-content">
              <p>
                A digital world where journaling is as normal and essential as
                brushing your teeth — building emotional fitness with every
                entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Your Journey with Us
        </h2>
        <ul className="timeline timeline-vertical">
          <li>
            <div className="timeline-start timeline-box bg-base-200">
              Start Writing
            </div>
            <div className="timeline-middle text-primary">📝</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle text-primary">🎭</div>
            <div className="timeline-end timeline-box bg-base-200">
              Track Mood
            </div>
          </li>
          <li>
            <hr />
            <div className="timeline-start timeline-box bg-base-200">
              AI Reflections
            </div>
            <div className="timeline-middle text-primary">🤖</div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle text-primary">🔒</div>
            <div className="timeline-end timeline-box bg-base-200">
              Secure & Private
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
