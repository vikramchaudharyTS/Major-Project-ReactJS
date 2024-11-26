# Assignment for this project - 
## Statement - A user must be able to generate multiple tokens with the same email and should be able to login with any of that token until they expire.

### Earlier in our code - One user can only generate one token as we'd check in the code if the user's mail already exists then he must verify the mail with the token first to login!
#### - But In a case if something happens on the server side or the user side they should be able to create a new token with the same email id.

```
 verificationToken: [{
        token: String,
        expiresAt: Date
    }],
```
Here's we'd store multiple tokens and their expiry time...which is 1hr for each token after generation!

# logic -
- if user already exists with the same mail - still generate a new token.
- and remove all the generated tokens once the user is verified his/her mail address.

##Sign up code - 
```

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields required");
        }

        // Check if the user already exists
        let userAlreadyExists = await userModel.findOne({ email });

        if (userAlreadyExists) {
            // if user already exists then generate a new verification token
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

            // push that token in the verification token array
            userAlreadyExists.verificationToken.push({
                token: verificationToken,
                expiresAt: Date.now() + 60 * 60 * 1000  // 1-hour expiration
            });

            await userAlreadyExists.save();

            // send the new token via email
            await sendVerificationEmail(userAlreadyExists.email, verificationToken);

            return res.status(200).json({
                success: true,
                message: "A new verification code has been sent to your email."
            });
        }

        // if user doesn't exist just create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate a random verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 60 * 60 * 1000; // TTL - 1 hour expiration time

        // this will generate a random username
        const username = req.body.username || `${name.toLowerCase().replace(/\s+/g, '')}${Math.floor(Math.random() * 10000)}`;

        const newUser = new userModel({
            email,
            password: hashedPassword,
            name,
            username,  
            verificationToken: [{ token: verificationToken, expiresAt }],
        });

        await newUser.save();

        // JWT token and email verification
        generateTokenAndSetCookie(res, newUser._id);
        await sendVerificationEmail(newUser.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...newUser._doc,
                password: null
            }
        });

    } catch (error) {
        console.log("EF-B/signup ", error.message);
        res.status(400).json({ success: false, message: "EF-B/signup " + error.message });
    }
};

```

## Verify email code - 
```
export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await userModel.findOne({
            verificationToken: {
                $elemMatch: {
                    token: code,
                    expiresAt: { $gt: Date.now() } // checking if the token is still valid
                }
            }
        });

        if (!user) return res.status(400).json({ success: false, message: "Invalid or expired verification code" });

        // searching the token through the token array
        const tokenIndex = user.verificationToken.findIndex(t => t.token === code);
        
        // if token exists mark user as verified and remove all tokens
        if (tokenIndex !== -1) {
            user.isVerified = true;
            user.verificationToken = []; // Remove all the tokens from the array
            await user.save();

            await sendWelcomeEmail(user.email, user.name);

            res.status(200).json({
                success: true,
                message: "Email verified successfully",
                user: { ...user._doc, password: undefined }
            });
        } else {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

    } catch (error) {
        console.log("EF-B/verifyEmail ", error.message);
        res.status(400).json({ success: false, message: "EF-B/verifyEmail " + error.message });
    }
};

```

With this code and logic user will be able to generate multiple tokens each's TTL of 1hr and when they verify with any of the token all the other token would be destroyed!
