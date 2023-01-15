import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from 'sections/banner';
import Services from 'sections/services';
import UltimateFeatures from 'sections/ultimate-feature';
import Faq from 'sections/faq';
// import PremiumFeature from 'sections/premium-feature';
// import CustomerSupport from 'sections/customer-support';
// import Pricing from 'sections/pricing';
// import Testimonials from 'sections/testimonials';
// import Blog from 'sections/blog';
// import Support from 'sections/support';

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Decentralized file storage and sharing platform"
          description="Storage of files and media documents using web3 decentralized technology. sharing made easy with web3!"
        />
        <Banner />
        {/**
        <Services />
        <UltimateFeatures />
        <Faq />
      <PremiumFeature />
        <CustomerSupport />
        <Pricing />
        <Testimonials />
        <Blog />
        <Support />
   */}
      </Layout>
    </ThemeProvider>
  );
}
