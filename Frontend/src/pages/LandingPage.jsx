
import Navbar from "../components_2/Navbar";
import Hero from "../components_2/Hero";
import Footer from "../components_2/Footer";
import About from "../components_2/About";
import Features from "../components_2/Features";
import Contact from "../components_2/Contact";

const LandingPage = () => {
    return(
        <div className="bg-white overflow-x-hidden">

            <Navbar />

            <main>

                <section id="home">
                <Hero />
                </section>

                <section id="features">
                <Features />
                </section>

                <section id="about">
                <About />
                </section>

                <section id="contact">
                <Contact />
                </section>

            </main>

            <Footer />

        </div>
    )
}

export default LandingPage;