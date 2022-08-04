const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef)

const todoPackage = grpcObject.todoPackage

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure())

const todo = process.argv[2]
client.createTodo({
    "id": -1,
    "text": todo
}, (err, response) => {
    console.log(response)
})

// client.readTodos({}, (err, response) => {
//     console.log(response)
// })

const call = client.readTodosStream();
call.on("data", (item) => {
    console.log(`received: ${JSON.stringify(item)}`)
})

call.on("end", (e) => {
    console.log("stream end")
})