import Navbar from '../../components/landingpage/Navbar';
import Hero from '../../components/landingpage/Hero';
import Trust from '../../components/landingpage/Trust';
import Categories from '../../components/landingpage/Categories';
import HowItWorks from '../../components/landingpage/Howitworks';
import WhySewaCenter from '../../components/landingpage/Whysewacenter';
import ProfessionalCTA from '../../components/landingpage/ProfessionalCTA';
import Footer from '../../components/landingpage/Footer';

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Trust />
            <Categories />
            <HowItWorks />
            <WhySewaCenter />
            <ProfessionalCTA />
            <Footer />
        </>
    );
}

export default Home;