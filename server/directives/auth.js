const {
    SchemaDirectiveVisitor,
    AuthenticationError
  } = require("apollo-server-express");
const {verifyJWToken} = require('../libs/auth')

class RequireAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      const { role } = this.args;
      field.resolve = async function(...args) {
        const [, , ctx] = args;
        if (ctx.token !== '') {
            return verifyJWToken(ctx.token).then((decoded)=>{
                if(decoded){
                    if(role && (decoded.role != role))
                        throw new AuthenticationError("Erro de autorização.");
                    else{
                        args[2].userId = decoded.sub;
                        return resolve.apply(this, args).then((result)=>{return result})
                    }
                }
            }).catch((e)=>{
                throw new AuthenticationError(e);
            })
        } else {
          throw new AuthenticationError(
            "You must be signed in to view this resource."
          );
        }
      };
    }
  }

module.exports = RequireAuthDirective;