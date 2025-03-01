declare global {
	namespace Express {
		interface Request {
			user?: { userId: string };
		}
	}
}
declare global {
	interface Window {
		Razorpay: any;
	}
}
