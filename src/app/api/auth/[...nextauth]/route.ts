import bcrypt from 'bcryptjs';
import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from '@/models/User.model';
import connect from '@/utils/db';

export const authOptions: any = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password"
				}
			},
			async authorize(credentials: any) {
                await connect();

                try {
                    const user = await UserModel.findOne({ email: credentials.email });
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isPasswordCorrect) {
                            return user;
                        }
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
		})
	],
	callbacks: {
		async signIn({ user, account }: { user: AuthUser, account: Account }) {
			if (account.provider === "credentials") {
				return true;
			}
		}
	}
}

export const handle = NextAuth(authOptions);
export { handle as GET, handle as POST };