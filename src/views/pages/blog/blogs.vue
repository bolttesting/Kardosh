<template>
    <Navbar navClass="navbar-white" />

    <section class="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
        <div class="absolute inset-0  bg-slate-900/80"></div>
        <div class="container relative">
            <div class="grid grid-cols-1 text-center mt-10">
                <h3 class="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Blogs & News</h3>
            </div>
        </div>
    </section>
    <div class="relative">
        <div class="shape overflow-hidden z-1 text-white dark:text-slate-900">
            <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
            </svg>
        </div>
    </div>

    <section class="relative md:py-24 py-16" >
        <div class="container">

            <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5" >
                <div v-for="(item, index) in blogList" :key="index" class="group relative h-fit hover:-mt-1.25 overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700 transition-all duration-500">
                    <div class="relative overflow-hidden">
                        <img :src="item.image" class="" alt="" />
                        <div class="absolute inset-e-4 top-4">
                            <span class="bg-primary text-white text-[14px] px-2.5 py-1 font-medium rounded-full h-5">{{item.type}}</span>
                        </div>
                    </div>

                    <div class="relative p-6">
                        <div class="">
                            <div class="flex justify-between mb-4">
                                <span class="text-slate-400 text-sm flex"><Calendar :style="{ width: 14,height:14 }" class="text-slate-900 dark:text-white me-2 text-sm"/>{{item.date}}</span>
                                <span class="text-slate-400 text-sm ms-3 flex"><Clock3 :style="{ width: 14,height:14 }" class="text-slate-900 dark:text-white me-2 text-sm"/>5 min read</span>
                            </div>

                            <RouterLink :to="`/blog-detail/${item.id}`" class="title text-xl font-medium hover:text-primary duration-500 ease-in-out">{{item.title}}</RouterLink>

                            <div class="mt-3">
                                <RouterLink :to="`/blog-detail/${item.id}`" class="btn btn-link hover:text-primary after:bg-primary duration-500 ease-in-out">Read More <ArrowRight :style="{ width: 17,height:17 }" class="ms-1 text-xs"/></RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Switcher />
    <Footer />
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import Switcher from '@/component/switcher.vue';
import Footer from '@/component/footer.vue';

import { blogList } from "@/component/data/data";

import {
    ArrowRight,
    Calendar,
    Clock3
} from 'lucide-vue-next'
</script>