
    var commentsArray = [];
        var totalComments = 0;
        $(document).ready(function () {
            var savedComments = JSON.parse(localStorage.getItem('Comments'));
            if (savedComments != null) {
                commentsArray = savedComments;
                totalComments = commentsArray[commentsArray.length - 1]["id"];
                commentsArray.forEach(function (comment) {
                    $("#post").append("<div class='comment' id='" + comment.id + "'><div class='logo'><img class='avatar' src='images/avatar.png'/></div><div class='userName'>" + comment.name + " on <span class='timeStamp'>" + comment.timeStamp + "</span></div><div class='userComment'>" + comment.comment + "</div><div class='likes'><span class='likeButton' id='" + comment.id + "'>Like</span><img class='likeImg' src='images/like.png'/><span class='likesCounter' id='" + comment.id + "'>" + comment.likes + "</span></div></div>");
                });
            }
            $('form#add-new-task').bind('submit', function (event) {
                event.preventDefault();
                var form = this;
                commentsArray = commentsArray;
                var timeStamp = timeNow();
                totalComments = totalComments + 1;
                var currentComment = ConvertFormToJSON(form);
                Object.assign(currentComment, { "timeStamp": timeStamp });
                Object.assign(currentComment, { "id": totalComments });
                Object.assign(currentComment, { "likes": 0 });
                commentsArray.push(currentComment)
                localStorage.setItem('Comments', JSON.stringify(commentsArray));
                $("#post").append("<div class='comment' id='" + totalComments + "'><div class='logo'><img class='avatar' src='images/avatar.png'/></div><div class='userName'>" + form['name'].value + " on <span class='timeStamp'>" + timeStamp + "</span></div><div class='userComment'>" + form['comment'].value + "</div><div class='likes'><span class='likeButton' id='" + totalComments + "'>Like</span><img class='likeImg' src='images/like.png'/><span class='likesCounter' id='1'>0</span></div></div>");
                $(form).find("#name, #comment").val("");
            });
            function ConvertFormToJSON(form) {
                var array = $(form).serializeArray();
                var json = {};
                array.forEach(function (data) {
                    json[data.name] = data.value || '';
                });
                return json;
            }
            function timeNow() {
                var date = new Date();
                var dd = date.getDate();
                var mm = date.getMonth() + 1; //January is 0!
                var yyyy = date.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }

                var today = mm + '/' + dd + '/' + yyyy;
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return today + " @ " + strTime;
            }

        });
        $(document).on("click", ".likeButton", function () {
            var commentID = $(this).attr('id');
            var numberOfLikes = parseInt($(this).siblings('.likesCounter')[0].innerHTML);
            numberOfLikes += 1;
            $(this).siblings('.likesCounter')[0].innerHTML = numberOfLikes;
            commentsArray.forEach(function (comment) {
                if (comment['id'] == commentID) {
                    comment['likes'] = numberOfLikes;
                }
            });
            localStorage.setItem('Comments', JSON.stringify(commentsArray));
        });