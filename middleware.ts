import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthCache } from './constants';
import { authService } from './services';

export function middleware(request: NextRequest) {
	const tokenCookie: any = request.cookies.get(AuthCache.AUTH_TOKEN_CACHE);
	if (tokenCookie?.value) {
		return NextResponse.next();
	}

	authService.logout();
	return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
	matcher: ['/overview', '/account', '/manager-config', '/edit-config/:path*'],
};
