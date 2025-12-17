#!/usr/bin/env node
const { PrismaClient } = require('@prisma/client')
;(async function(){
  try{
    const prisma = new PrismaClient()
    const rows = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
    console.log(JSON.stringify(rows, null, 2))
    await prisma.$disconnect()
  }catch(err){
    console.error('error', err)
    process.exit(1)
  }
})()
