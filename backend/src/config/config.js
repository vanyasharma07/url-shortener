
export const cookieOptions = {
    httpOnly: true,
  secure: false, // true in production
  sameSite: "lax",
    maxAge: 1000 * 60 * 60, // 5 minutes
}