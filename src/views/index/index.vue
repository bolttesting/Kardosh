<template>
  <Navbar nav-class="navbar-white" />

  <HomeHero />

  <section class="relative md:pb-24 pb-16 home-page-stack">
    <Property />
    <WhyInvestDubai />
    <FeaturedDevelopers />
    <MostSoldOffPlan />
    <About />
    <Client />
    <HomeCta />
    <GetInTuch />
  </section>
  <Footer />
  <Switcher />
</template>

<script setup>
import Navbar from '@/component/navbar.vue'
import HomeHero from '@/component/kardosh/home/HomeHero.vue'
import WhyInvestDubai from '@/component/kardosh/home/WhyInvestDubai.vue'
import FeaturedDevelopers from '@/component/kardosh/home/FeaturedDevelopers.vue'
import HomeCta from '@/component/kardosh/home/HomeCta.vue'
import About from '@/component/about.vue'
import Property from '@/component/Properties/property.vue'
import MostSoldOffPlan from '@/component/kardosh/home/MostSoldOffPlan.vue'
import Client from '@/component/client.vue'
import GetInTuch from '@/component/get-in-tuch.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
</script>
