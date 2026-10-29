import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillInfo(first: string, last: string, zip: string) {
    await this.page.getByTestId('firstName').fill(first);
    await this.page.getByTestId('lastName').fill(last);
    await this.page.getByTestId('postalCode').fill(zip);
    await this.page.getByTestId('continue').click();
  }

  async finish() { await this.page.getByTestId('finish').click(); }

  get error() { return this.page.getByTestId('error'); }
  get subtotal() { return this.page.getByTestId('subtotal-label'); }
  get total() { return this.page.getByTestId('total-label'); }
  get confirmation() { return this.page.getByTestId('complete-header'); }
}
