'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useT } from '@/components/layout/LanguageProvider';
import { formatPkr } from '@/lib/utils';
import { resellers } from '@/content/site';

/**
 * Client-side only. Illustrates what a reseller keeps at a given published
 * margin - deliberately framed as an illustration, since actual margins are set
 * per listing by the seller and vary widely.
 */
export function MarginCalculator() {
  const t = useT();
  const [price, setPrice] = useState(2500);
  const [margin, setMargin] = useState(15);
  const [quantity, setQuantity] = useState(20);

  const perSale = Math.round((price * margin) / 100);
  const perMonth = perSale * quantity;

  return (
    <Card className="md:p-8">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="space-y-6">
          <div>
            <label htmlFor="calc-price" className="mb-1.5 block text-sm font-semibold text-ink-900">
              {t(resellers.calculator.priceLabel)}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-ink-400">
                Rs.
              </span>
              <input
                id="calc-price"
                type="number"
                min={0}
                step={50}
                dir="ltr"
                value={price}
                onChange={(event) => setPrice(Math.max(0, Number(event.target.value) || 0))}
                className="tabular h-12 w-full rounded-[10px] border border-ink-200 bg-white ps-12 pe-4 text-base font-semibold text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="calc-margin" className="mb-1.5 block text-sm font-semibold text-ink-900">
              {t(resellers.calculator.marginLabel)}
              <span className="tabular ms-2 text-brand-600">{margin}%</span>
            </label>
            <input
              id="calc-margin"
              type="range"
              min={1}
              max={40}
              step={1}
              value={margin}
              onChange={(event) => setMargin(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-[#FB5301]"
            />
            <div className="mt-1 flex justify-between text-xs text-ink-400">
              <span>1%</span>
              <span>40%</span>
            </div>
          </div>

          <div>
            <label htmlFor="calc-qty" className="mb-1.5 block text-sm font-semibold text-ink-900">
              {t(resellers.calculator.qtyLabel)}
              <span className="tabular ms-2 text-brand-600">{quantity}</span>
            </label>
            <input
              id="calc-qty"
              type="range"
              min={1}
              max={200}
              step={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-100 accent-[#FB5301]"
            />
            <div className="mt-1 flex justify-between text-xs text-ink-400">
              <span>1</span>
              <span>200</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-ink-050 p-6" aria-live="polite">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-400">
            {t(resellers.calculator.perSale)}
          </p>
          <p className="tabular mt-1 text-3xl font-extrabold text-ink-900">{formatPkr(perSale)}</p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-400">
            {t(resellers.calculator.perMonth)}
          </p>
          <p className="text-brand-gradient tabular mt-1 text-4xl font-extrabold">
            {formatPkr(perMonth)}
          </p>

          <p className="mt-6 border-t border-ink-200 pt-4 text-sm text-ink-400">
            {t(resellers.calculator.disclaimer)}
          </p>
        </div>
      </div>
    </Card>
  );
}
