import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/blocks/LegalPage';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy - AdeelSab',
  description:
    'What personal information AdeelSab collects from merchants and website visitors, why, how long it is kept, and how to have it removed.',
  path: '/legal/privacy/',
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sub="What we collect, why we collect it, and what we will never do with it."
    >
      <h2 id="who-we-are">Who we are</h2>
      <p>
        This policy covers adeelsab.com and the AdeelSab marketplace. The data controller is the
        registered entity named in the site footer. Contact details for privacy questions are on our{' '}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2 id="what-we-collect">What we collect</h2>
      <p>From people who fill in the waitlist form on this website, we collect:</p>
      <ul>
        <li>Your name</li>
        <li>Your WhatsApp number</li>
        <li>Your city</li>
        <li>Your business type, product category and approximate monthly sales volume</li>
        <li>Anything you choose to write in the optional message field</li>
        <li>Your IP address, recorded with the submission to prevent automated abuse</li>
      </ul>
      <p>
        From people who register as sellers, we additionally collect identity and payout information
        required to operate a seller account and to meet legal obligations: CNIC details, bank or
        mobile wallet details, and business address.
      </p>
      <p>
        We do not collect payment card details on this website. We do not knowingly collect any
        information from children.
      </p>

      <h2 id="why-we-collect-it">Why we collect it</h2>
      <ul>
        <li>To contact you about selling on AdeelSab, which is the reason you gave it to us</li>
        <li>To create and verify a seller account and to pay you</li>
        <li>To operate deliveries, which requires sharing addresses with courier partners</li>
        <li>To meet tax, anti-fraud and regulatory obligations under Pakistani law</li>
        <li>To understand which pages of this site are useful, in aggregate</li>
      </ul>

      <h2 id="what-we-do-not-do">What we do not do</h2>
      <p>
        <strong>We do not sell your personal information to anybody.</strong> We do not share your
        contact details with other merchants, advertisers, or data brokers, and we do not send your
        number to marketing lists.
      </p>

      <h2 id="who-we-share-with">Who we share it with</h2>
      <p>We share the minimum necessary with:</p>
      <ul>
        <li>
          <strong>Courier partners</strong> — the recipient name, address and phone number needed to
          deliver a parcel
        </li>
        <li>
          <strong>Payment providers</strong> — the details needed to send you money
        </li>
        <li>
          <strong>Service providers</strong> that host this website and our email, bound by contract
          to process data only on our instructions
        </li>
        <li>
          <strong>Authorities</strong> where we are legally required to do so
        </li>
      </ul>

      <h2 id="analytics-and-cookies">Analytics and cookies</h2>
      <p>
        This website uses a small amount of browser storage to remember your language preference.
        That preference stays in your browser and is never sent to us.
      </p>
      <p>
        Where analytics is enabled, we use Google Analytics with IP anonymisation to understand
        aggregate page usage. It does not tell us who you are. You can block it with any standard
        browser setting or extension without affecting how the site works.
      </p>

      <h2 id="how-long-we-keep-it">How long we keep it</h2>
      <p>
        Waitlist submissions are kept until launch and for up to twelve months afterwards, unless you
        ask us to delete them sooner. Seller account records are kept for as long as the account is
        active and afterwards for the period required by tax and company law.
      </p>

      <h2 id="your-choices">Your choices</h2>
      <p>You can, at any time, ask us to:</p>
      <ul>
        <li>Tell you what information we hold about you</li>
        <li>Correct anything that is wrong</li>
        <li>Delete your waitlist submission and stop contacting you</li>
      </ul>
      <p>
        Message us on WhatsApp or email the support address on our <Link href="/contact">contact page</Link>
        . We will act on it within a reasonable period and will not ask you to justify the request.
      </p>

      <h2 id="security">Security</h2>
      <p>
        The website is served over HTTPS. Waitlist submissions are stored outside the public web
        directory. Access to seller records is limited to staff who need it. No system is perfectly
        secure, and we will tell affected people promptly if something goes wrong.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        If we change this policy materially we will update the date at the top of this page and, for
        registered sellers, notify you directly.
      </p>
    </LegalPage>
  );
}
