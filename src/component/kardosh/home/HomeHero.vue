<template>
  <section class="home-hero">
    <HeroMedia />

    <div class="home-hero__foreground">
      <div class="home-hero__content">
        <div class="container">
          <div class="home-hero__copy">
            <p class="home-hero__eyebrow">
              {{ BRAND.name }} · United Arab Emirates
            </p>
            <h1 class="home-hero__title">
              Discover exceptional
              <span class="home-hero__title-accent">properties</span>
              across the UAE
            </h1>
            <p class="home-hero__lead">
              Curated off-plan and ready homes across the UAE.
            </p>
          </div>
        </div>
      </div>

      <div class="hero-search-card-wrap">
        <PropertySearchBar variant="hero" :show-tabs="true" initial-mode="off-plan" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { BRAND } from '@/config/brand'
import HeroMedia from '@/component/kardosh/HeroMedia.vue'
import PropertySearchBar from '@/component/kardosh/PropertySearchBar.vue'
</script>
