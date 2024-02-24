import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req,res) => {
    res.render("registration.ejs");
});

app.post("/form", async (req,res) => {
    const name = req.body.textnames;
    const fathername = req.body.fathername;
    const paddress = req.body.paddress;
    const personaladdress = req.body.personaladdress;
    const sex = req.body.sex;
    const city = req.body.City;
    const course = req.body.Course;
    const district = req.body.District;
    const state = req.body.State;
    const pincode = req.body.pincode;
    const email = req.body.emailid;
    const dob = req.body.dob;
    const mobileno = req.body.mobileno;

    try {
        await db.query(
            "INSERT INTO profile (Name, Father_Name, Postal_Add, Personal_Add, Sex, City, Course, District, State, Pin_Code, Email, DOB, Mobile_No) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
            [name, fathername, paddress, personaladdress, sex, city, course, district, state, pincode, email, dob, mobileno]
        );
        console.log("success")
        
    } catch (error) {
        console.log(error);
        
    }
    /*await db.query("INSERT INTO profile (Name) VALUES ('yyy')");*/
    res.render("registration.ejs");
});

app.listen(port, () =>{
    console.log(`Server is runnig on ${port}.`);
});