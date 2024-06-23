function link(parent, args, context) {
  const link =  context.prisma.vote
    .findUnique({ 
      link:{
        where: { id: parent.id }
      }
    });
  console.log("我是link" );
  console.log(link);
  return link;
}

/*
经过测试，使用
const link = await  context.prisma.vote
    .findUnique({ where: { id: parent.id },select:{link:true} });得到的结果为
    {
      link: {
        id: '8c4df919-c40b-4d33-9ad0-d3d0e79aec42',
        createdAt: 2024-06-19T13:05:15.873Z,
        description: '123456',
        url: 'www.123456.com',
        postedById: 'de9615cb-716a-4bab-a306-bcf01b817d46'
      }
}

使用const link = await  context.prisma.vote
    .findUnique({ where: { id: parent.id },select:{link:true} }).link();得到的结果为
    {
      id: '5cbff25a-25ad-420c-b5fe-04f190f424a4',
      createdAt: 2024-06-19T13:07:20.321Z,
      description: 'abc',
      url: 'www.abc.com',
      postedById: 'de9615cb-716a-4bab-a306-bcf01b817d46'
    } 



使用const link = context.prisma.vote
    .findUnique({ where: { id: parent.id },select:{link:true} }).link();得到的结果为
{
  then: [Function: then],
  catch: [Function: catch],
  finally: [Function: finally],
  requestTransaction: [Function: requestTransaction],
  postedBy: [Function (anonymous)],
  votes: [Function (anonymous)],
  [Symbol(Symbol.toStringTag)]: 'PrismaPromise'
}
此时是一个未解析的primose对象，前端会处理异步，通过then(),await等方法，等待primose对象解析出数据对象，而如果在后端await，就是等待数据对象解析出来，直接返回给前端数据对象


无论如何，使用.link()提取的数据，少包裹了一层，是前端所需要的
*/

function user(parent, args, context) {
  return context.prisma.vote
    .findUnique({ where: { id: parent.id } })
    .user();
}

module.exports = {
  link,
  user
};
