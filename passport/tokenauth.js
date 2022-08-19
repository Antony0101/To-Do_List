import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserModel } from '../database';

//configuring passport

export default (passport)=>{
    //configuring passport
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey =process.env.JWT_PRIVATE_KEY;
    passport.use('tokenauth',new Strategy(opts, async function(jwt_payload, done) {
        try{
        const user = await UserModel.findOne({$and:[{_id: jwt_payload.user},{token_id:jwt_payload.token_id}]});
            if(user) {

                return done(null, [user,jwt_payload.token_id]);
            } 
            else {
                return done(null, false);
                // or you could create a new account
            }
        }
        catch(e){
            return done(e,null);
        }
    }));
};
