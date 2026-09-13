import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalPage } from '@/components/blocks/LegalPage';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Seller Agreement - AdeelSab',
  description:
    'The terms between AdeelSab and its merchants: commission, delivery, cash on delivery, returns, payouts, and how either side can end the relationship.',
  path: '/legal/seller-agreement/',
});

export default function SellerAgreementPage() {
  return (
    <LegalPage
      title="Seller Agreement"
      sub="The commercial terms between AdeelSab and a merchant selling on the platform."
    >
      <h2 id="the-relationship">The relationship</h2>
      <p>
        AdeelSab operates a marketplace. You sell your own goods through it. We are not the seller,
        we do not take ownership of your stock, and the contract of sale is between you and the
        buyer. We provide the platform, the delivery, the collection of payment and the support.
      </p>

      <h2 id="who-can-sell">Who can sell</h2>
      <p>To hold a seller account you must:</p>
      <ul>
        <li>Be at least 18 and legally able to enter into a contract in Pakistan</li>
        <li>Provide a valid CNIC, and a payout account in the same name</li>
        <li>Have the legal right to sell the goods you list</li>
        <li>Provide accurate information and keep it up to date</li>
      </ul>

      <h2 id="your-obligations">Your obligations</h2>
      <ul>
        <li>
          <strong>List accurately.</strong> Descriptions, photographs, measurements and stock levels
          must reflect the actual goods.
        </li>
        <li>
          <strong>Hold the stock.</strong> Do not list goods you do not have or cannot dispatch
          within the agreed handover time.
        </li>
        <li>
          <strong>Dispatch on time.</strong> Have orders packed and ready for collection within the
          agreed window.
        </li>
        <li>
          <strong>Pack adequately.</strong> Goods damaged because of inadequate packaging are your
          responsibility, and a courier claim will fail.
        </li>
        <li>
          <strong>Sell only lawful goods.</strong> No counterfeits, no goods that infringe someone
          else&apos;s trade mark, no items restricted or prohibited under Pakistani law or by our
          courier partners.
        </li>
        <li>
          <strong>Respond to buyers and to us</strong> within a reasonable time.
        </li>
      </ul>

      <h2 id="commission-and-fees">Commission and fees</h2>
      <p>
        Commission is charged per completed sale at the rate published for the product&apos;s
        category on our <Link href="/pricing">pricing page</Link>, calculated on the product price and not
        on shipping paid by the buyer. There is no listing fee, subscription, setup fee or withdrawal
        fee. Any change to commission rates will be notified in advance and will not apply to orders
        already placed.
      </p>
      <p>
        Founding Seller terms, where granted, apply for the stated period from launch and are set out
        in your account.
      </p>

      <h2 id="delivery-and-cod">Delivery and cash on delivery</h2>
      <p>
        Delivery is carried out by our own fleet in our own-fleet cities and by our courier partners
        elsewhere, at the rates on our <Link href="/delivery">delivery page</Link>. You choose per listing
        whether you, the buyer, or both bear the shipping cost.
      </p>
      <p>
        Where a buyer pays cash on delivery, that cash is collected by us or our courier partner on
        your behalf and remitted to you through the settlement process, less deductions.
      </p>

      <h2 id="returns-and-rto">Returns and return to origin</h2>
      <p>
        Where a buyer refuses a parcel, cannot be contacted, or the address is not serviceable, the
        parcel is returned to you and an RTO charge applies at the published rate. Where goods are
        returned because they were faulty, damaged, counterfeit or not as described, the cost of the
        return is yours and the buyer is refunded in full including shipping.
      </p>
      <p>
        Disputes are decided against the listing as it stood at the time of sale. Our full approach is
        described in the <Link href="/seller-hub/returns-and-disputes">returns and disputes guide</Link>.
      </p>

      <h2 id="reseller-enabled-listings">Reseller-enabled listings</h2>
      <p>
        You may mark any listing as available to resellers and set the margin payable on a sale made
        by a reseller. That margin is published to resellers and cannot be changed retrospectively for
        orders already placed. No reseller may sell your product without you having enabled it.
      </p>

      <h2 id="payouts">Payouts</h2>
      <p>
        Settlement runs on the published cycle after a delivery is confirmed, to your nominated bank
        account or mobile wallet, less commission, any shipping you agreed to absorb, any RTO charges,
        any reseller margin, and any tax required to be withheld by law. Every deduction is itemised
        against the relevant order.
      </p>
      <p>
        A payment may be held only for a stated reason: an open dispute on that order, a suspected
        counterfeit or safety issue, or an unverified payout account. You will be told the reason and
        the order number, and a held payment is released promptly once the matter is resolved.
      </p>

      <h2 id="tax">Tax</h2>
      <p>
        You are responsible for your own tax affairs, including income tax and any sales tax that
        applies to what you sell. Where the law requires us to withhold tax on payments to you, we
        will, at the rate applicable to your filer status, and it will be shown on your statement.
      </p>

      <h2 id="suspension-and-termination">Suspension and termination</h2>
      <p>
        You may close your account at any time. Orders already placed must still be fulfilled, and
        any balance owed to you is settled on the normal cycle.
      </p>
      <p>
        We may suspend or close an account for: selling counterfeit or prohibited goods, repeated
        failure to dispatch, manipulating reviews or orders, providing false identity or payout
        details, or abuse of buyers or staff. Except where the conduct is serious or unlawful, we will
        tell you what the problem is and give you an opportunity to correct it first.
      </p>

      <h2 id="liability">Liability</h2>
      <p>
        Each party is liable for its own obligations. We are not liable for lost profit or indirect
        loss. Nothing in this agreement excludes liability that cannot be excluded under Pakistani
        law.
      </p>

      <h2 id="changes">Changes to this agreement</h2>
      <p>
        We may update these terms. Material changes will be notified to registered sellers in advance,
        and continuing to sell after the effective date constitutes acceptance.
      </p>

      <h2 id="governing-law">Governing law</h2>
      <p>
        This agreement is governed by the laws of the Islamic Republic of Pakistan, and the courts of
        Pakistan have exclusive jurisdiction.
      </p>
    </LegalPage>
  );
}
