import React, { Component } from 'react'
import Logo from "../images/Marrying2.png"

const loggedIn = window.localStorage.getItem('loggedIn');


export default class home extends Component {

    render() {
        return (
            <div>
                {/*<h1>Home</h1>*/}
                {/*<p>This is home.</p>*/}
                <header class="bg-dark py-5">
                    <div class="container px-5">
                        <div class="row gx-5 align-items-center justify-content-center">
                            <div class="col-lg-8 col-xl-7 col-xxl-6">
                                <div class="my-5 text-center text-xl-start">
                                    <h1 class="display-5 fw-bolder text-white mb-2">Mero Venue</h1>
                                    <p class="lead fw-normal text-white-50 mb-4">What to book a special place for your marriage ceremony or for your birthday party
                                        Look no further because you have come to right place.
                                        We provide you with options to browse and book both venue and vendors.
                                        Just click on what kind of program you are going to held and search at top or
                                        go directly to Venues tab and start browsing. </p>
                                    <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                        {loggedIn ? null : <a class="btn btn-primary btn-lg px-4 me-sm-3" href="/login">Get Started</a> }           
                                        <a class="btn btn-outline-light btn-lg px-4" href="/venues">Start Browsing</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src={Logo} alt="..." /></div>
                        </div>
                    </div>
                </header>
                <section class="py-5" id="features">
                    <div class="container px-5 my-5">
                        <div class="row gx-5">
                            <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder mb-0">A better way to start booking.</h2></div>
                            <div class="col-lg-8">
                                <div class="row gx-5 row-cols-1 row-cols-md-2">
                                    <div class="col mb-5 h-100">
                                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>
                                        <h2 class="h5">Book Your Dream Event Today!</h2>
                                        <p class="mb-0">Are you planning a wedding, birthday party, or corporate event? Our booking website makes it easy to find the perfect venue and services to make your event unforgettable.</p>
                                    </div>
                                    <div class="col mb-5 h-100">
                                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-building"></i></div>
                                        <h2 class="h5">Create Your Own Custom Package</h2>
                                        <p class="mb-0">With our website, you can select the services you need for your event, including catering, entertainment, transportation, and more. Combine them into a custom package and pay for everything at once.</p>
                                    </div>
                                    <div class="col mb-5 mb-md-0 h-100">
                                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                                        <h2 class="h5">Stay Organized with Our To-Do List</h2>
                                        <p class="mb-0">Planning an event can be stressful, but our website makes it easier with our built-in to-do list. Keep track of all your tasks and deadlines in one place, so you can stay on top of everything.</p>
                                    </div>
                                    <div class="col h-100">
                                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                                        <h2 class="h5">Browse Thousands of Venues and Services</h2>
                                        <p class="mb-0">We have a wide selection of venues and services to choose from, so you can find exactly what you need for your event. Browse photos, reviews, and pricing to make an informed decision.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="py-5 bg-light">
                    <div class="container px-5 my-5">
                        <div class="row gx-5 justify-content-center">
                            <div class="col-lg-10 col-xl-7">
                                <div class="text-center">
                                    <div class="fs-4 mb-4 fst-italic">"Mero Venue is a easy website to get your all needs for marriage. This team has helped me a lot."</div>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <img class="rounded-circle me-3" src="https://cdn.discordapp.com/avatars/989155267994320916/6dab549e854a9af34e8358edb2b505eb.webp?size=64" alt="..." />
                                        <div class="fw-bold">
                                            Sampanna
                                            Pokharel / A happily married man

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-5 bg-light">
                    <div class="container px-5 my-5">
                        <div class="row gx-5 justify-content-center">
                            <div class="col-lg-10 col-xl-7">
                                <div class="text-center">
                                    <div class="fs-4 mb-4 fst-italic">"Very nice platform for someone who wants to manage their events with easy to use functions."</div>
                                    <div class="d-flex align-items-center justify-content-center">
                                        <img class="rounded-circle me-3" src="" alt="..." />
                                        <div class="fw-bold">
                                            Ashrin
                                            K.C / Party-Goer

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}