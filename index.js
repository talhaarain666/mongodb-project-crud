let express = require("express");
const { dbConnection } = require("./dbConnection");
const { ObjectId } = require("mongodb");
let app = express();

app.use(express.json());

app.get("/student-read", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")
    let data = await studentCollection.find().toArray();
    let resObj = {
        status: 1,
        msg: "Data Added",
        data
    }
    res.send(resObj)
})

app.post("/student-insert", async (req, res) => {
    // make connection
    let myDB = await dbConnection();

    // collection
    let studentCollection = myDB.collection("students")

    // data from body
    const { sName, sEmail } = req.body;
    let obj = { sName, sEmail };

    // to check if same email exist before
    let checkEmail = await studentCollection.findOne({ sEmail })

    if (checkEmail) {

        return res.send({
            status: 0,
            msg: "Email Already Exist",
        })

    }

    let insertRes = await studentCollection.insertOne(obj)

    let resObj = {
        status: 1,
        msg: "Data Added",
        insertRes
    }
    // res.send("Student Insert Api")
    res.send(resObj)

})

app.delete("/student-delete/:id", async (req, res) => {
    // id from param
    let { id } = req.params;

    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")

    let deleteRes = await studentCollection.deleteOne({ _id: new ObjectId(id) })

    let resObj = {
        status: 1,
        msg: "Data Deleted",
        deleteRes
    }
    res.send(resObj)

})

app.put("/student-update/:id", async (req, res) => {
    // id from param
    let { id } = req.params;

    // updated data from body
    const { sName, sEmail } = req.body;
    let obj = {};

    // if user not put name or email then it remains same as previous (this is optional)
    if (sName) {
        obj["sName"] = sName
    }
    if (sEmail) {
        obj["sEmail"] = sEmail
    }

    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")

    let updateRes = await studentCollection.updateOne({ _id: new ObjectId(id) }, { $set: obj })

    // response
    let resObj = {
        status: 1,
        msg: "Data Updated",
        updateRes
    }
    res.send(resObj)
})
app.listen("8000")