//jquery ajax code
//befor writing code..first add jquery cdn link to our layout.ejs
//add this javascript file to home.ejs bcz we are filling input data there

//using jquery ajax input data is sent to server in JSON format and take back data for creating post
{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            //default action of submit button has removed now
            event.preventDefault();

            //creating ajax request
            $.ajax({
                type: 'post',
                url: '/post/add',
                data: newPostForm.serialize(),
                success: function(data){
                    //data.data.post.user.name = locals.user.name;
                    let newPost = newPostDom(data.data.post);
                    $('#post-list>ul').prepend(newPost);
                    //fetching link of delete post
                    deletePost($(' .delete-post-button',newPost));//notice their is a space before .delete-post-button
                    console.log(data);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    //creating a post
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
           <p>${post.user.name}</p>
           <p>${post.content}</p>
    
            
            
        <a class="delete-post-button" href="/post/delete/${post._id}">delete_post</a>
    
    
    <div id="comment-forms">
        <form action="/comment/add" id="comment-form" method="POST">
        
            <textarea name="content" id="" cols="15" rows="2" placeholder="comment here..." required></textarea><br>
            <!-- through this hidden type we send data like here we r sending post id on which comment are added -->
            <input type="hidden" name="post_id" value="${post._id}">
            <input type="submit" value="add">
        </form>
        <div id="comment-list">
            <ul id="post-comments-${post._id}">
        
            </ul>  
        </div>
    </div>
   
    
    </li>`);
    }



    

    //method to delete a post
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).attr("href"),  //or $(deleteLink).prop("href")
                // data: since delete operation so no data sent
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

   //for deleting any post using ajax
    deletePost($('.delete-post-button'));

    createPost();
}