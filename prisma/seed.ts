import {prisma} from "../src/lib/prisma"

async function seed(){
    await prisma.event.create({
        data: {
            id: '6eb3f9df-8e76-4bb6-9874-8e52c2613479',
            title: 'Jornada Cientifica',
            slug: 'jornada-cientifica',
            details: 'Um evento inspirando os jovems iventores do caf',
            maximoAttendes: 200
        }
    })
}


seed().then(() => {
    console.log('Database seeded')
    prisma.$disconnect()
})