import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { userService } from '@unixy/db';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL!
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails?.[0].value;
            const googleId = profile.id;
            const name = profile.displayName;

            let user = await userService.getUserByGoogleId(googleId);
            if (!user && email) {
                user = await userService.createUserWithGoogle(email, googleId, name);
            }
            return done(null, user || undefined);
        }
    )
);
