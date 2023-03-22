import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import Logo from "../images/MeroVenue-logos_white.png"

export default function Footer() {

    const admin = window.localStorage.getItem('isAdmin');


    return (
        <MDBFooter className='text-center' color='white' bgColor='dark'>
            {admin ?

                (
                <></>
                ) :
                (

                    <MDBContainer className='p-4'>

                <section className=''>
                    <form action=''>
                    </form>
                </section>

                <section className='mb-4'>
                    <p>
                        Welcome to our venue booking website! We are passionate about helping our clients find the perfect venue for their special occasions. Whether you're looking for a small, intimate space for a wedding reception or a large conference center for a corporate event, we've got you covered. Our website has list of many venues for local event and is dedicated to finding the perfect space to fit your needs and budget.
                        Thank you for choosing us to help plan your next event.
                        We can't wait to help you make it a success!
                    </p>
                </section>

                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <img src={Logo} height="200" />
                                </h6>
                                
                            </MDBCol>

                            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <MDBIcon color='secondary' icon='home' className='me-2' />
                                    Balkumari, Kharibot, Lalitpur
                                </p>
                                <p>
                                    <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                    bijaybaniya1088@gmail.com
                                </p>
                                <p>
                                    <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 5200500
                                </p>
                                <p>
                                    <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 5200449
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </MDBContainer>


                    
                )}

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Copyright: Bijay Baniya

            </div>
            
        </MDBFooter>
    );
}