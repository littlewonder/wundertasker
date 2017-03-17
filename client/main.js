Template.taskList.helpers({
    'returnList': function () {
        return list.find({ addedby: Meteor.userId() }, {
            sort: {
                preference: 1
            }
        });
    },
    'returnCount': function () {
        return list.find({ addedby: Meteor.userId(), status: false }).count();
    }
});

Template.taskitem.helpers({
    'statusofbox': function () {
        var isCompleted = this.status;
        if (isCompleted) {
            return "checked";
        } else {
            return "";
        }
    }
});

Template.taskList.events({
    'mouseover .onetask': function () {
        let taskid = this._id;
        Session.set('hovered', taskid);
    },
    'click #rm': function () {
        let taskid = Session.get('hovered');
        if (confirm('Are you sure you want to delete this task')) {
            list.remove(taskid);
        }
    },
    'change [type=checkbox]': function () {
        let taskid = Session.get('hovered');
        let status = this.status;
        if (status) {
            list.update({
                _id: taskid
            }, {
                $set: {
                    status: false
                }
            });
        } else {
            list.update({
                _id: taskid
            }, {
                $set: {
                    status: true
                }
            });
        }
    }
});

Template.newTask.events({
    'submit form': function (event) {
        event.preventDefault();
        let title = $('[name="title"]').val();
        let pref = $('[name="preference"]').val();
        let currentuserid = Meteor.userId();
        if (pref === "") {
            pref = list.find().count() + 1;
        }
        if (title === "") {
            alert("please add the task");
        } else {
            list.insert({
                title: title,
                preference: pref,
                date: new Date(),
                status: false,
                addedby: currentuserid
            });
        }
        $('[name="title"]').val('');
        $('[name="preference"]').val('');
    },
    'click #newtask':function(){
        event.preventDefault();
        let item = document.getElementById("taskform");
        if(item.className==="invisible"){
            document.getElementById("taskform").className="visible";
            document.getElementById("newtask").innerHTML="Close";
        }else{
            document.getElementById("taskform").className="invisible";
            document.getElementById("newtask").innerHTML="Add Task";
        }
    }
});

Template.register.events({
        'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var confirmPasswordVar = event.target.registerPasswordConfirm.value;
        if(passwordVar===confirmPasswordVar){
        $("#error").attr('class', 'invisible');
        Accounts.createUser({
        email: emailVar,
        password: passwordVar
    },
        function(error){
            $("#error3").attr('class', 'visible');
        });
    Meteor.loginWithPassword(emailVar, passwordVar);
        }else{
        $("#error").attr('class', 'visible');
        }
    },
    'click form': function(){
        $("#error").attr('class', 'invisible');
        $("#error3").attr('class', 'invisible');
    }
});

    Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        $("#error2").attr('class', 'invisible');
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar, function(error){
            if(error){$("#error2").attr('class', 'visible');}
        });
    },
    'click form': function(){
        $("#error2").attr('class', 'invisible');
    }

});

Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.login.rendered = function(){
            var toggle = function() {
            let status = document.getElementById("loginwrap").className;
            let otherstatus = document.getElementById("registerwrap").className;
            if (status === "invisible") {
                document.getElementById("loginwrap").className = "visible";
                if(otherstatus==="visible"){
                    document.getElementById("registerwrap").className = "invisible";
                    document.getElementById("registerbtn").className="inactive";
                }
            document.getElementById("loginbtn").className="active";
            } else {
                document.getElementById("loginwrap").className = "invisible";
                document.getElementById("loginbtn").className="inactive";
            }
        }
        let test = document.getElementById("loginbtn");
        test.addEventListener('click', toggle);
};

Template.register.rendered = function(){
            var toggle = function() {
            let status = document.getElementById("registerwrap").className;
            let otherstatus = document.getElementById("loginwrap").className;
            if (status === "invisible") {
                document.getElementById("registerwrap").className = "visible";
                document.getElementById("registerbtn").className="active";
                if(otherstatus === "visible"){
                    document.getElementById("loginwrap").className = "invisible";
                    document.getElementById("loginbtn").className="inactive";
                }
            } else {
                document.getElementById("registerwrap").className = "invisible";
                document.getElementById("registerbtn").className="inactive";
            }
        }
        let test = document.getElementById("registerbtn");
        test.addEventListener('click', toggle);
};