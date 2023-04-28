const Pool = require('pg-pool')
const pool = new Pool({
    database: 'postgres',
    user: 'postgres',
    password: '123456789',
    port: 5432,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000,
    maxUses: 7500,
  })

pool.on('error', (error, client) => {
    console.error(error)
    process.exit(-1)
})
pool.on('connect', client => {
    console.log('New client')
})
pool.on('remove', client => {
    console.log('Client pool removed')
})

// Импортируем библиотеку fastify для развертывания веб-сервера
const fastify = require('fastify')({
    logger: true // Эта штука нужна, чтобы в терминале отображались логи запросов
})
// Блок кода, который нужен для исправления ошибки с CORS
fastify.register(require('@fastify/cors'), (instance) => {
    return (req, callback) => {
        const corsOptions = {
            // This is NOT recommended for production as it enables reflection exploits
            origin: true
        };

        // do not include CORS headers for requests from localhost
        if (/^localhost$/m.test(req.headers.origin)) {
            corsOptions.origin = false
        }

        // callback expects two parameters: error and options
        callback(null, corsOptions)
    }
})

// Создание маршрута для get запроса
fastify.get('/', async function (request, reply) {
    const client = await pool.connect()
    try{
        const users = await client.query(`select * from users`)
        console.log(users.rows)
        reply.send(users.rows)
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.release()
    }
})

fastify.get('/folders/show', async function(request, reply){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/folders/show'
    const client = await pool.connect()
    try{
        const folders = await client.query('select "folderId","folderName","folderColor" from folders')
        data.message = folders.rows
    }
    catch(e){
        console.log(e);
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})

fastify.post('/folders/create', async function (request, reply) {
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/folders/show'
    const client = await pool.connect()
    const folderName = request.body.folderName
    const folderColor = request.body.folderColor
    try{
        const users = await client.query(`insert into folders ("folderName", "folderColor") values ($1,$2) 
        returning "folderId","folderName","folderColor"`,[folderName, folderColor])
        data.message = folders.rows
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})

fastify.post('/folders/edit', async function (request, reply) {
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/folders/edit'
    const client = await pool.connect()
    const folderId = request.body.folderId
    const newFolderName = request.body.newFolderName
    const newFolderColor = request.body.newFolderColor
    try{
        const folders = await client.query(`UPDATE folders SET "folderName" = '${newFolderName}', "folderColor" = '${newFolderColor}' 
        WHERE "folderId" = ${folderId}`)
        data.message = folders.rows
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})

fastify.post('/folders/delete', async function (request, reply) {
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/folders/delete'
    const client = await pool.connect()
    const folderId = request.body.folderId
    try{
        const users = await client.query(`delete from folders where "folderId" = ${folderId}`)
        data.message = folders.rows
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})

fastify.get('/tasks/show', async function(request, reply){
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/tasks/show'
    const client = await pool.connect()
    try{
        const tasks = await client.query(`select "taskId","taskText","isDone","folderId" from tasks`)
        data.message = tasks.rows
    }
    catch(e){
        console.log(e);
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})

fastify.post('/tasks/create', async function (request, reply) {
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/tasks/delete'
    const client = await pool.connect()
    const isDone = request.body.isDone
    const taskText = request.body.taskText
    const folderId = request.body.folderId
    try{
        const tasks = await client.query(`insert into tasks ("isDone", "taskText", "folderId") values ($1,$2,$3) 
        returning "taskId","isDone","taskText","folderId"`,[isDone, taskText, folderId])
        data.message = tasks.rows
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})

fastify.post('/tasks/delete', async function (request, reply) {
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/tasks/delete'
    const client = await pool.connect()
    const folderId = request.body.folderId
    const taskId = request.body.taskId
    try{
        const tasks = await client.query(`delete from tasks where "taskId" = ${taskId} and "folderId" = ${folderId}`)
        data.message = tasks.rows
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})

fastify.post('/tasks/edit', async function (request, reply) {
    let data = {
        message: 'error',
        statusCode: 400
    }
    const urlName = '/tasks/edit'
    const client = await pool.connect()
    const folderId = request.body.folderId
    const taskId = request.body.taskId
    const newTaskText = request.body.newTaskText
    const newIsDone = request.body.newIsDone
    try{
        const tasks = await client.query(`UPDATE tasks SET "taskText" = '${newTaskText}', "isDone" = '${newIsDone}' 
        WHERE "folderId" = ${folderId} and "taskId" = ${taskId}`)
        data.message = tasks.rows
    }
    catch(e){
        console.log(e)
    }
    finally{
        client.release()
        console.log(urlName, 'client release()')
    }
    reply.send(data)
})


// Создание маршрута для post запроса
fastify.post('/post',function (request, reply) {
    console.log(`Тело запроса: `,JSON.stringify(request.body))
    reply.send(request.body)
})

// Создание запроса с использование path параметров
fastify.get('/:id',function (request, reply) {
    console.log(`Path параметры, переданные в запросе: `,JSON.stringify(request.params))
    reply.send(request.params)
})

// Создание запроса с использованием query параметров
fastify.get('/query',function (request, reply) {
    console.log(`Query параметры, переданные в запросе`, JSON.stringify(request.query))
    reply.send(request.query)
})

// Запускаем сервер на порту 3000
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})