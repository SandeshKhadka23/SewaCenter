import Navbar from '../../components/landingpage/Navbar'
import Hero from '../../components/landingpage/Hero'
import Trust from '../../components/landingpage/Trust'
import Howitworks from '../../components/landingpage/Howitworks'
import Whysewacenter from '../../components/landingpage/Whysewacenter'
import ProfessionalCTA from '../../components/landingpage/ProfessionalCTA'
import Footer from '../../components/landingpage/Footer'

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Trust />
            <Howitworks />
            <Whysewacenter />
            <ProfessionalCTA />
            <Footer />
        </>
    )
}

export default Home;