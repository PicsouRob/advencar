import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn: string | number;
    noTimestamp: boolean,
}

const defaultSigninOption: SignOption = {
    expiresIn: "1h",
    noTimestamp: true,
};

export function signJwt(
    payload: JwtPayload,
    option: SignOption = defaultSigninOption
): string {
    const secretKey: jwt.Secret = process.env.JWT_USER_ID_SECRET as string;
    const token: string = jwt.sign(payload, secretKey, option);

    return token;
}

export function verifyJwt(token: string) {
    try {
        const secretKey: jwt.Secret | undefined = process.env.JWT_USER_ID_SECRET;

        if(!secretKey) {
            throw new Error("JWT secret key is not provided or accessible.");
        }

        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        
        return decoded;
    } catch(e) {
        console.error("JWT Verification Error:", e);
        return null;
    }
}