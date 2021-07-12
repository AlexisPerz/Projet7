const User = require('./users');
const Post = require('./posts');
const Comment = require('./comments');

exports.load=async()=>{

    Post.belongsTo(User);
    Post.hasMany(Comment);
    Comment.belongsTo(User);
    
    await User.sync({
        alter:true
    });
    await Post.sync();  
    await Comment.sync();
}