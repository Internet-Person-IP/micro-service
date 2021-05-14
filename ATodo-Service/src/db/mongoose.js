const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://pizza:pizza@cluster0.yplh1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

