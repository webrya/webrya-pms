export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/api/properties/:path*', '/api/tasks/:path*', '/api/bookings/:path*', '/api/invites/:path*', '/api/settings/:path*'],
};
