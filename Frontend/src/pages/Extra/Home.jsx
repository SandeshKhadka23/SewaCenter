import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/landingpage/Hero'

import Howitworks from '../../components/landingpage/Howitworks'
import Whysewacenter from '../../components/landingpage/Whysewacenter'
import ProfessionalCTA from '../../components/landingpage/ProfessionalCTA'
import Footer from '../../components/landingpage/Footer'

function Home() {
    return (
        <>
            <Navbar />
            <Hero />

            <categories />
            <Howitworks />
            <Whysewacenter />
            <ProfessionalCTA />
            <Footer />
        </>
    )
}

export default Home;