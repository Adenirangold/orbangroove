import User from "@/models/user";
import { connectToDb } from "@/utils/database";
import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      try {
        await connectToDb();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const nameParts = (user.name || "").split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          console.log("Creating new user with name:", firstName, lastName);

          await User.create({
            email: user.email,
            firstName: firstName,
            lastName: lastName,
          });
        }

        return true;
      } catch (err) {
        console.log("error here ooo");
        console.log(err);

        return false;
      }
    },
  },
});
