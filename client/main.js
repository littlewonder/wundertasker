Template.taskList.helpers({
    'returnList': function () {
        return list.find({}, {
            sort: {
                preference: 1
            }
        });
    },
    'returnCount': function () {
        return list.find().count();
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

    'click #box': function () {}
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
