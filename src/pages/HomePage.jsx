import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Zap, Users, Code, Activity } from "lucide-react";
// Assuming 'lucide-react' is now installed

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform">
    <div className="card-body items-center text-center p-8">
      <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="card-title text-xl font-bold mb-2">{title}</h3>
      <p className="text-base-content/70">{description}</p>
    </div>
  </div>
);

const featureList = [
  {
    icon: Users,
    title: "Community & Networking",
    description:
      "Find and connect with developers who share your interests. Build your professional network and find collaborators.",
  },
  {
    icon: Code,
    title: "Showcase Your Projects",
    description:
      "Display your latest work, get valuable feedback, and gain visibility within the developer ecosystem.",
  },
  {
    icon: Zap,
    title: "Real-Time Chat",
    description:
      "Chat instantly with your connections, discuss ideas, and collaborate on projects seamlessly. Never miss an important message.",
  },
  {
    icon: Activity,
    title: "Stay Updated",
    description:
      "Get notified instantly when someone accepts your connection request so you can stay in touch in real-time.",
  },
];

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-base-300 via-base-200 to-base-100 overflow-hidden py-20">
        {/* Subtle background shape for visual interest */}
        <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-full bg-primary/5 transform skew-x-12"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-4 px-6 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                Welcome to DevConnect
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Connect<span className="text-primary"> </span> Collaborate
                <span className="text-primary"> </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Code Together
                </span>
              </h1>
              <p className="text-lg md:text-xl text-base-content/80 mb-10 max-w-3xl leading-relaxed">
                The ultimate platform for developers to network, showcase
                their portfolio, and collaborate on innovative projects.
                Your next great idea starts here.
              </p>
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-lg px-10 shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-semibold"
                  >
                    Start Building Now
                  </Link>
                  <a
                    href="#features"
                    className="group flex items-center gap-2 px-4 py-2 text-base-content/70 hover:text-secondary transition-colors duration-300 font-medium"
                  >
                    What We Offer
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              ) : (
                <div className="flex justify-center lg:justify-start">
                  <Link
                    to="/feed"
                    className="btn btn-primary btn-lg px-10 shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-semibold"
                  >
                    Go to Your Feed
                  </Link>
                </div>
              )}
            </div>

            {/* Right Side - Feature Image/Illustration (Original SVG restored) */}
            <div className="flex-1 relative max-w-xl w-full">
              {" "}
              {/* increased max width */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-10 blur-3xl"></div>
              <div className="relative">
                <svg
                  className="w-full h-auto text-base-content/90 scale-110" // slightly larger
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              A Platform Built{" "}
              <span className="text-primary">For Developers</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              DevConnect provides the tools you need to elevate your career and
              collaborate on world-changing software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureList.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action (CTA) Section - Improved Styling */}
      <section className="py-16 bg-gradient-to-r from-base-100 to-base-200 border-t border-base-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Community? 🚀
          </h2>
          <p className="text-xl text-base-content/70 mb-8">
            Start connecting, building, and learning today. It's fast, free, and
            designed for you.
          </p>
          {!user && (
            <Link
              to="/login"
              // Changed btn-secondary to btn-primary and added shadow for consistency
              className="btn btn-primary btn-lg px-12 shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              Create My Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
