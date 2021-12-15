var {GraphQLNonNull, GraphQLString} = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../../models/UserModel');
const generateToken = require('../../../utils/generateToken');

const addUser = {
    type: UserType,
    args: {
        first_name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        last_name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: { 
            type: new GraphQLNonNull(GraphQLString)
        },
        password: { type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: async function (root, params,{req, res})  {
        console.log('params', params);
        let user = await User.findOne({email: params.email});
        if (user) {
            console.log('userexist');
            res.status(400)
            throw new Error('User already exists!');
        }
        const userModel = new User(params);
        const newUser = await userModel.save();
        if(!newUser) {
            throw new Error('Error')
        }
        return newUser
    }
}

const updateUser = {
    type: UserType,
    args: {
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            name: 'name',
            type: GraphQLString
        },
        email: {
            name: 'email',
            type: GraphQLString
        }
    },
    resolve: async function(root, param) {
       let updateUser = {};
       if(param.name) {
           updateUser.name = param.name
       }
       if(param.email) {
           updateUser.email = param.email
       }
       const uUser = await User.findByIdAndUpdate(param._id, updateUser, {new: true})
       console.log(uUser)
       if(!uUser) {
           throw new Error('Error')
       }
       return uUser
    }
}

const login = {
    name: 'login',
    type: UserType,
    args: {
      email: {type: GraphQLString},
      password: {type: GraphQLString},
    },
     resolve: async function (root, params,{req, res}) {
        console.log("args",params)
        const user = await User.findOne({email: params.email})
        if(!user || !(await user.isMatchPassword(params.password))) {
            console.log("error",user)
          res.status(400)
          throw new Error("Invalid email or password")
        }
        else{
          let convertedUser = user.toJSON()
          convertedUser.token = generateToken(convertedUser._id);
          delete convertedUser.password
          console.log(convertedUser)
          return convertedUser
        }
      }
  }
  

// const deleteUser = {
//     type: UserType,
//     args: {
//         _id: {
//             name: '_id',
//             type: new GraphQLNonNull(GraphQLString)
//         }
//     },
//     resolve: async function (root, param) {
//       const deleteUser =  await User.findByIdAndRemove(param._id)
//       if(!deleteUser) {
//          throw new Error('Error');
//       }
//       return deleteUser
//     }
// }

module.exports = {addUser,updateUser,login}