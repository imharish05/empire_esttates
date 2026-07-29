import React, { useEffect, Fragment } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer2';
import PageTitle from '../Layout/PageTitle';
import FaqSection from '../Element/FaqSection';
import { applyMetaTags } from '../../utils/meta';

export default function FaqPage() {
  useEffect(() => {
    applyMetaTags(
      'Frequently Asked Questions (FAQ) | Empire Estates',
      'Find answers to common questions about plot layouts, CMDA/RERA approvals, bank loan assistance, and purchasing land with Empire Estates.'
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Header isTransparent={false} />
      <div className="page-content bg-white">
        <PageTitle
          motherMenu="FAQs"
          activeMenu="Frequently Asked Questions"
          placement="FAQs Page Banner"
        />
        <FaqSection
          showHeader={false}
          title="Frequently Asked Questions"
          subtitle="GOT QUESTIONS? WE HAVE ANSWERS"
        />
      </div>
      <Footer />
    </Fragment>
  );
}
