const express = require('express');
const app = express();
require('dotenv').config();

const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.set('trust proxy', 1);

const allowlist = [
  'https://www.tiktok.io.vn',
  'https://tiktok.io.vn',
  'https://app.tiktok.io.vn',
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);        // cho curl/healthcheck
    cb(null, allowlist.includes(origin));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,     // để cors tự trả preflight
  optionsSuccessStatus: 204
};

// Áp dụng cho mọi request, đủ để preflight trả 204
app.use(cors(corsOptions));
app.use((req, _res, next) => {
  console.log('[REQ]', req.method, req.path, '| Origin:', req.headers.origin, '| Cookie:', req.headers.cookie);
  next();
});






// Chỉ mount router MỘT LẦN
const apiRouter = require('./routes/AccountApi/API');  // file này tự gắn verify cho route cần bảo vệ
app.use('/', apiRouter); // thay vì '/api'
app.get('/api/health', (req,res)=>res.json({ok:true}));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
