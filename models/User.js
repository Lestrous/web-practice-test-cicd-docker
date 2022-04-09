export default mongoose => {
    const UserSchema = mongoose.Schema({
        login: {
            type: String,
            required: [true, 'Login is required!'],
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
        },
    });

    return mongoose.model('User', UserSchema);
}