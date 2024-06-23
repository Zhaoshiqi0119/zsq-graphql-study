import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function insertUser() {
    const user = await prisma.user.create({
        data:{
            username:"王五",
            password:"123456",
        }
    })
    console.log(user)
}

async function insertUser2() {
    const user = await prisma.user.create({
        data:{
            username:"lisa",
            password:"123456",
            userInfo:{
                create:[
                    {
                        phone:'10086',
                        home:"中国",
                        gender:"男"
                    }
                ]
            }
        }
    })
    console.log(user)
}


async function deleteUser() {
    await prisma.user.delete({
        where:{
            id:6
        }
    })
}

async function updateUser() {
    await prisma.user.update({
        data:{
            username:"猪八戒",
            userInfo:{
                create:[
                    {
                        phone:"123456"
                    }
                ]
            }
        },
        where:{
            id:3
        }
    })
}

async function selectAllUser() {
    const user = await prisma.user.findMany({
        where:{//条件查询
            id:5,
            username:"张三",
            password:{
                equals:"123",
                contains:"123",//包含
                in:["123","456","789"],
                notIn:["123","456"],
                //比较大小
                lt:"abc",
                lte:"abc",
                gt:"abc",
                gte:"abc",
                startsWith:"abc",
                endsWith:"abc",
                not:"abc"
            },
            AND:{
                password:"12345",
            },
            NOT:{
                username:"123"
            }
        },
        orderBy:{//根据id降序
            id:"desc",
            password:"asc"
        },
        skip:2,//跳过查出来的前两条
        take:3,//一次性取三条数据   根据skip和take配合实现分页
        select:{//只展示username列中的数据
            username:true
        }
    })
    console.log(user)
}
selectAllUser()
// deleteUser()
// insertUser2()
// updateUser()