import { rest } from 'msw'

export const handlers = [
	rest.get('/api/investors', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					"firm_id": 2670,
					"firm_name": "Mjd Jedi fund",
					"AUM": 426920827,
					"date_added": "2010-06-08T00:00:00Z",
					"last_updated": "2024-02-21T00:00:00Z",
					"established_at": "2010-06-08T00:00:00Z",
					"firm_type": "bank",
					"city": "Hong Kong",
					"country": "China",
					"address": "29 Nathan Road, Hong Kong",
					"postal_code": "37E"
				}
			])
		)
	}),
]