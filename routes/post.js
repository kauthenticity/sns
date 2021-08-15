const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Post = require('../schemas/post');
const router = express.Router();

try{
  fs.readdirSync('uploads');
}
catch(error){
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
  fs.mkdirSync('uploads');
}

var upload = multer({
  storage : multer.diskStorage({
    destination : (req, file, cb)=>{
      cb(null, 'uploads/')
    },
    filename : (req, file, cb)=>{
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext)+Date.now()+ext);
    }
  }),
  limits : {fields : 7,}});

const upload2 = multer();


router.post('/', upload2.any(), async(req, res, next)=>{
  const {content, url} = req.body;

  console.log('req.body :', req.body);

  Post.create({
    id : req.user.id,
    content : content,
    img : url,
  }).then(async()=>{
    const posts = await Post.find();
   
    res.render('main', {title : 'development', isLoggedIn : req.user, posts : posts}, (err, html)=>{
      res.redirect('/');
    });
  
  }).catch(error=>{
    console.error(error);
    next(error);
  })
})

router.get('/:id', async(req, res, next)=>{ 
  id = req.params.id;
  res.render('post', {title : `write - ${id}`, id : id, isLoggedIn : req.user,});
});


router.post('/img', upload.single('img'), (req, res)=>{
  console.log('req.file :', req.file);
  res.json({url : `/img/${req.file.filename}`});
});

router.get('/edit/:id', async(req, res, next)=>{

});

router.get('/delete/:id', async(req, res, next)=>{
  const postId = req.params.id;
  const post = await Post.findOne({_id : postId});
  const url = '../uploads/'+post.img.slice(4);
  const userId = post.id;
  await Post.deleteOne({_id : postId}, async(err, result)=>{
    if(err){
      console.error(err);
      next(err);
    }

    await fs.access(url, async(err)=>{
      if(!err){
        await fs.unlink(url, (err)=>{
          if(err){
            console.error(err);
            return next(err);
          }
        })
      }
    }); 
  });

  res.render('main', {title : 'development', isLoggedIn : req.user, posts : posts}, (err, html)=>{
    res.redirect('/');
  });
})


module.exports = router;