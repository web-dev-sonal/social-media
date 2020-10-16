module.exports.home = function(req,res){
    // return res.end('<h1> home page </h1>');
    //redirect to view engine

    //console.log(req.cookies);   //in every request we get some cookies
    //res.cookie('user_id',25);   //changing in cookie in server side
    res.render('home',{
        title: "Home"
    });
}
