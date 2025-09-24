import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-base-300 via-base-200 to-base-100 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left Side - Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-4 px-6 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                Welcome to DevConnect
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                Connect<span className="text-primary"> </span> Collaborate
                <span className="text-primary"> </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Code Together
                </span>
              </h1>
              <p className="text-lg md:text-xl text-base-content/70 mb-8 max-w-2xl leading-relaxed">
                Join our thriving developer community where innovation meets
                collaboration. Connect with passionate developers, showcase your
                projects, and build something amazing together.
              </p>
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                  <a
                    href="#features"
                    className="group flex items-center gap-2 px-4 py-2 text-base-content/70 hover:text-primary transition-colors duration-300"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              ) : (
                <div className="flex justify-center lg:justify-start">
                  <Link
                    to="/feed"
                    className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Explore Feed
                  </Link>
                </div>
              )}
            </div>

            {/* Right Side - Feature Image/Illustration */}
            <div className="flex-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-10 blur-3xl"></div>
              <div className="relative">
                <svg
                  className="w-full h-auto text-base-content/90"
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
    </div>
  );
};

export default HomePage;
