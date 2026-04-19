import React from 'react'
import Hero from '../components/Home/Hero'
import Categories from '../components/Home/Categories'
import FeaturedSolutions from '../components/Home/FeaturedSolutions'
import DeveloperSection from '../components/Home/DeveloperSection'

const Home = () => {
    return (
        <main>
            <Hero />
            <Categories />
            <FeaturedSolutions />
            <DeveloperSection />
        </main>
    )
}

export default Home
