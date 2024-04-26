import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
 
export default { providers: [GitHub] } satisfies NextAuthConfig
 
// export const authConfig = {
//   pages: {
//     signIn: '/SignIn',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/Home');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/Contact', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;