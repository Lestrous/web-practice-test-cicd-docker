export default (mongoose) => {
    const TermSchema = mongoose.Schema({
        title: {
            type: String,
            required: [true, 'title is required!'],
        },
        description: {
            type: String,
        },
        name: {
            type: String,
            required: [true, 'name is required!'],
        },
    });

    return mongoose.model('Term', TermSchema);
};
