const User = require('./users');
const Post = require('./posts');
const Comment = require('./comments');

exports.load=async()=>{

    Post.belongsTo(User, {
        onDelete: "cascade"
    });
    Post.hasMany(Comment, {
        onDelete: "cascade"
    });
    Comment.belongsTo(User, {
        onDelete: "cascade"
    });
    
    await User.sync({
        alter:true
    });
    await Post.sync({
        alter:true
    });  
    await Comment.sync({
        alter:true
    });
}