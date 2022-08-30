const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const getAllMovies = async (req, res) => {
    const allMovies = await prisma.movie.findMany({
        include: {
            screenings: true
        }
    })

    res.json({
        movies: allMovies
    })
}

const createMovie = async (req, res) => {
    const {
        title,
        runtimeMins
    } = req.body

    if (!title || !(runtimeMins >= 0)) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            runtimeMins,
            screenings: {
                connect: {id: 1}
            }
        },
        include: { 
            screenings: true
        }
    })

    // try {
    //     /**
    //      * This will create a Customer AND create a new Contact, then automatically relate them with each other
    //      * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record
    //      */
    //     const createdCustomer = await prisma.customer.create({
    //         data: {
    //             name,
    //             contact: {
    //                 create: {
    //                     phone,
    //                     email
    //                 }
    //             }
    //         },
    //         // We add an `include` outside of the `data` object to make sure the new contact is returned in the result
    //         // This is like doing RETURNING in SQL
    //         include: { 
    //             contact: true
    //         }
    //     })

    //     res.status(201).json({ customer: createdCustomer })
    // } catch (e) {
    //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //         if (e.code === "P2002") {
    //             return res.status(409).json({ error: "A customer with the provided email already exists" })
    //         }
    //     }
        
    //     res.status(500).json({ error: e.message })
    // }
}

module.exports = {
    createMovie,
    getAllMovies
}