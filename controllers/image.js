const fs = require('fs');
const path =  require('path');

module.exports = {
    index: function(req, res){
        const viewModel1 = {
            image: {
                uniqueId:1,
                title: 'Sample Image 1',
                description:'This is a sample.',
                filename:'sample1.jpg',
                views: 0,
                likes: 0,
                timestamp:Date.now()
            },
            comments: [
                {
                    image_id:1,
                    email:'test@testing.com',
                    name:'Test Tester',
                    gravatar:'http://lorempixel.com/75/75/animals/1',
                    comment:'This is a test comment...',
                    timestamp:Date.now() 
                },{
                    image_id:1,
                    email:'test@testing.com',
                    name:'Test Tester',
                    gravatar:'http://lorempixel.com/75/75/animals/2',
                    comment:'Another followup comment!',
                    timestamp: Date.now()
                }
            ]
        };
        res.render('image', viewModel1);
    },
             
    create: function(req, res){
        const saveImage = function(){
            const possible = 'abcdefghijklmnopqrstuvwxyz1234567890';
            const imgUrl = '';

            for (var i = 0; i < 6; i+=1){
                imgUrl+=possible.charAt(Math.floor(Math.random() * possible.length));
            }
            const tempPath = req.files.file.path;
            const ext = path.extname(req.files.file.name).toLowerCase();
            const targetPath = path.resolve('./public/upload/' + imgUrl + ext);

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                fs.rename(tempPath, targetPath, function(err) {
                    if (err) throw err;
                    res.redirect('/images/'+ imgUrl);
                });
            } else {
                fs.unlink(tempPath, function () {
                    if (err) throw err;
                    res.json(500, {error: 'Only image files are allowed.'});
                });
            }
        };
        saveImage();
    },

    like: function(req, res){
        res.send('The image: like POST controller');
    },

    comment: function(req,res){
        res.send('The image: comment POST controller');
    }
};