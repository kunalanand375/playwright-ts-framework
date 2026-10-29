import { test, expect } from '@playwright/test';

test.describe.serial('Booking API: CRUD', () => {
  let token: string;
  let bookingId: number;

  const payload = {
    firstname: 'Jane',
    lastname: 'Tester',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    additionalneeds: 'Breakfast',
  };

  test.beforeAll(async ({ request }) => {
    const res = await request.post('/auth', { data: { username: 'admin', password: 'password123' } });
    expect(res.ok()).toBeTruthy();
    token = (await res.json()).token;
    expect(token).toBeTruthy();
  });

  test('POST creates a booking', async ({ request }) => {
    const res = await request.post('/booking', { data: payload });
    expect(res.status()).toBe(200);
    const body = await res.json();
    bookingId = body.bookingid;
    expect(bookingId).toBeGreaterThan(0);
    expect(body.booking).toMatchObject({ firstname: 'Jane', lastname: 'Tester', totalprice: 150 });
  });

  test('GET returns the booking', async ({ request }) => {
    const res = await request.get(`/booking/${bookingId}`);
    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject({ firstname: 'Jane', depositpaid: true });
  });

  test('PUT updates the booking', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
      data: { ...payload, firstname: 'Janet' },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).firstname).toBe('Janet');
  });

  test('PATCH partially updates the booking', async ({ request }) => {
    const res = await request.patch(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
      data: { lastname: 'Updated' },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).lastname).toBe('Updated');
  });

  test('PUT without token is forbidden', async ({ request }) => {
    const res = await request.put(`/booking/${bookingId}`, { data: payload });
    expect(res.status()).toBe(403);
  });

  test('DELETE removes it, then GET returns 404', async ({ request }) => {
    const del = await request.delete(`/booking/${bookingId}`, { headers: { Cookie: `token=${token}` } });
    expect(del.status()).toBe(201);
    const get = await request.get(`/booking/${bookingId}`);
    expect(get.status()).toBe(404);
  });
});

test.describe('Booking API: other checks', () => {
  test('GET /booking returns a list of ids', async ({ request }) => {
    const res = await request.get('/booking');
    expect(res.ok()).toBeTruthy();
    const list = await res.json();
    expect(Array.isArray(list)).toBe(true);
    expect(list[0]).toHaveProperty('bookingid');
  });

  test('invalid login returns no token', async ({ request }) => {
    const res = await request.post('/auth', { data: { username: 'admin', password: 'wrong' } });
    expect((await res.json()).reason).toBe('Bad credentials');
  });
});
