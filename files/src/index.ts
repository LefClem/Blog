import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const app = express();
const port = 8000;

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../images');
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage});

app.post("/upload", upload.single("file"), (req: any, res: any) => {
    fs.readFile(req.file.path, (err) => {
        if(err){
            console.log(err);
            res.status(500).json({ error: err})
        } else {
            res.status(201).json({
                status: "success",
                filename: `http://localhost:${port}/files/${req.file.filename}`
            })
        }
    })
})

app.get("/files/:filename", (req: any, res: any) => {
    const filePath = path.join(__dirname + "/../uploads")
})
