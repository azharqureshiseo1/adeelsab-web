import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/blocks/LegalPage';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Terms of Use - AdeelSab',
  description: 'The terms that apply to using the adeelsab.com website.',
  path: '/legal/terms/',
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      sub="The terms that apply to using this website. Selling on the marketplace is covered separately by the Seller Agreement."
    >
      <h2 id="scope">Scope</h2>
      <p>
        These terms apply to your use of the adeelsab.com website. If you register as a seller, the{' '}
        <Link href="/legal/seller-agreement">Seller Agreement</Link> also applies and takes precedence on
        anything to do with selling, commission, delivery or payment.
      </p>

      <h2 id="what-this-site-is">What this site is</h2>
      <p>
        This is the corporate and merchant-acquisition website for AdeelSab. The marketplace itself
        is a separate application. At the time of writing, AdeelSab has not launched to buyers, and
        this site operates as a waitlist rather than a shop.
      </p>

      <h2 id="acceptable-use">Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Submit false information, or somebody else&apos;s details, through any form on this site</li>
        <li>Attempt to gain unauthorised access to any part of the site or its infrastructure</li>
        <li>Use automated tools to scrape, flood or overload the site</li>
        <li>Copy the content of this site for commercial republication without permission</li>
      </ul>

      <h2 id="waitlist-submissions">Waitlist submissions</h2>
      <p>
        Joining the waitlist is not a contract and does not create a seller account. It is an
        expression of interest. We may contact you about selling on AdeelSab, and you can ask us to
        stop at any time. We may decline any application without giving a reason.
      </p>
      <p>
        Any Founding Seller benefits described on this site are subject to eligibility and to the
        terms in force when your seller account is created.
      </p>

      <h2 id="accuracy-of-information">Accuracy of information</h2>
      <p>
        We try to keep commercial figures on this site accurate and current. Rates, timelines,
        charges and coverage described here are indicative until confirmed in your Seller Agreement,
        and figures marked as pending confirmation are exactly that. Nothing on this website is an
        offer capable of acceptance.
      </p>

      <h2 id="intellectual-property">Intellectual property</h2>
      <p>
        The AdeelSab name, logo, site design and written content belong to us. Courier and payment
        partner marks shown on this site belong to their respective owners and are used to identify
        those services.
      </p>

      <h2 id="third-party-links">Third-party links</h2>
      <p>
        Where we link to other websites, including courier tracking, government portals and WhatsApp,
        we are not responsible for their content or their privacy practices.
      </p>

      <h2 id="liability">Liability</h2>
      <p>
        This website is provided as it is. To the extent permitted by law, we are not liable for loss
        arising from use of, or inability to use, this website. Nothing in these terms limits
        liability that cannot be limited under Pakistani law.
      </p>

      <h2 id="governing-law">Governing law</h2>
      <p>
        These terms are governed by the laws of the Islamic Republic of Pakistan, and the courts of
        Pakistan have exclusive jurisdiction.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these terms go to the business address on our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
