import "./Home.css";
function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

  <div className="hero-left">

    <h1>🪷 NatyaMudra AI</h1>

    <h2>AI Powered Bharatanatyam Mudra Recognition</h2>

    <p>
      Experience Classical Bharatanatyam Meets Artificial Intelligence.
    </p>

    <button>Start Detecting</button>

  </div>

  <div className="hero-right">

    <img
      src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700"
      alt="Bharatanatyam"
    />

  </div>

</section>


      {/* Features Section */}
      <section className="features-section">

        <h2>✨ Features</h2>

        <div className="features">

          <div className="feature-card">
            <h3>📷 Real-Time Detection</h3>
            <p>Detect Bharatanatyam mudras instantly using AI.</p>
          </div>

          <div className="feature-card">
            <h3>🧠 AI Powered</h3>
            <p>MediaPipe analyzes hand landmarks in real time.</p>
          </div>

          <div className="feature-card">
            <h3>📚 Learn Mudras</h3>
            <p>Explore Bharatanatyam mudras with descriptions.</p>
          </div>

          <div className="feature-card">
            <h3>📜 Detection History</h3>
            <p>View all your previously detected mudras.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;