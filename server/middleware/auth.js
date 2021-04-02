import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        
        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test') // verify token with the secret

            req.userId = decodedData?.id;
        }
        else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub is named by GG for the user id.
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;