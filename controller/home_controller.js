module.exports.home = function(req,res){
    // return res.end('<h1> home page </h1>');
    //redirect to view engine
    res.render('home',{
        title: "Home"
    });
}
