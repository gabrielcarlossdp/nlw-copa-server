
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/diego3g.png',
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'Example Pool',
            code: '123',
            ownerId: user.id,

            participants:{
                create:{
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-02T14:03:53.201Z',
            firstTeamCountryCode: 'IDE',
            secondTeamCountryCode: 'BR',
        }
    })

     await prisma.game.create({
        data:{
            date:'2022-11-03T14:03:53.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    participants:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId:pool.id
                            } 
                        }
                    }
                }                
            }
        }
    })


    
}

main()