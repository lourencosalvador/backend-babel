import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { prisma } from '../lib/prisma';

export async function getBadgeUser(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendees/:attendeeId/badge', {
        schema: {
            summary: "Pega os dados do passe que pertence ao o usuarios do evento",
            tags: ['attendees'],
            params: z.object({
                attendeeId: z.coerce.number().int(),
            }),
            response: {
                200: z.object({
                    badge: z.object({
                        name: z.string(),
                        email: z.string(),
                        eventTitle: z.string()
                    })
                })
            }
        }
    }, async (request, reply) => {
         

        const {attendeeId} = request.params
        
        const attende = await prisma.attendee.findUnique({
            select: {
                name: true,
                email: true,
                event: {
                    select: {
                        title: true
                    }
                }
            },
        where: {
            id: attendeeId
        }
        })

        if(attende === null){
            throw new Error("Credenciais do usuario não econtrado")
        }


        return reply.send({
            badge: {
                name: attende.name,
                email: attende.email,
                eventTitle: attende.event.title
            }
        })
    })
}