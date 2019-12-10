import React from 'react';
import Head from 'next/head';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

const AppLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title>AI for Personal Training.</title>
            </Head>
            <Header
                brand="By 4MAKERS"
                rightLinks={<HeaderLinks />}
                fixed
                // color="transparent"
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
            />
                {children}
            <Footer />
        </>
    )
}

export default AppLayout;
