import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {z} from "zod";
import { prisma } from "../lib/prisma";


export async function regiserForEvent(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().post('/events/:eventId/attendes', {
      schema: {
        body: z.object({
            name: z.string().min(4),
            email: z.string().email(),
        }),
        params: z.object({ 
            eventId: z.string().uuid()
        }),
        response: {
            201: z.object({
                attendeeId: z.number()
            })
        }
      }
    },  async (request, reply) => {
      
        const {eventId} = request.params
        const {email, name} =  request.body

        const attendeeFromEmailExist = await prisma.attendee.findUnique({
            where: {
                eventId_email: {
                    email,
                    eventId
                }
            }
        })

        if(attendeeFromEmailExist !== null){
            throw new Error('O email ja existe')
        }

        const [event, numberTotalEvents] = await Promise.all([
            prisma.event.findUnique({
                where: {
                    id: eventId
                }
            }),

            prisma.attendee.count({
                where: {
                    eventId
                }
            })
        ])


        if(event?.maximoAttendes && numberTotalEvents >= event.maximoAttendes){
            throw new Error('O evento ja atingiu o numero maximo de participantes')
        }

        const attende = await prisma.attendee.create({
            data: {
                name,
                email,
                eventId
            },
        })
        return reply.status(201).send({attendeeId: attende.id})
    })
}