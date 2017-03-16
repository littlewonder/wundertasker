Template.taskList.helpers({
    'returnList': function () {
        return list.find({}, {
            sort: {
                preference: 1
            }
        });
    },
    'returnCount': function () {
        return list.find({
            status: false
        }).count();
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
            });
        }
        $('[name="title"]').val('');
        $('[name="preference"]').val('');
    }
});
