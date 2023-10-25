"use server"

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error{}
export async function GetFormsStats(){
    const user = await currentUser()
    if(!user){
        throw new UserNotFoundErr()
    }

    const stats =await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true,
        }
    })

    const visits = stats._sum.visits || 0
    const submissions = stats._sum.submissions || 0

    let submissionsRate = 0
    if(visits){
        submissionsRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionsRate

    return {
        visits,
        submissions,
        submissionsRate,
        bounceRate
    }

}