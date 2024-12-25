import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDb'

export const authoptions = NextAuth({
    providers: [
   

      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
    
    ],
    callbacks:{
      async signIn({user, account, profile, email,credentials}){
        if (account.provider == "github"){
          await connectDB()
          //conect to the data base
          // const client = await mongoose.connect('mongodb://localhost:27017/Buy')
          // Check if the user already exists in the database
          const CurrentUser = await User.findOne({email: email})
          if(!CurrentUser){
            // if not, create a new user
            const newUser = await User.create({
              email: user.email,
              username: user.email.split('@')[0],
            })
           
            
          }
          
          
          return true

        }
      }
    },

    async session({session, user, token}){
      const dbUser = await User.findOne({email: session.user.email})
      console.log(dbUser)
      session.user.name = dbUser.username
      return session
    },
  })

  export { authoptions as GET, authoptions as POST}

